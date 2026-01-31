import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const TiendaApp());
}

String defaultBaseUrl() {
  if (Platform.isAndroid) {
    return 'http://10.0.2.2:8000';
  }
  return 'http://127.0.0.1:8000';
}

class TiendaApp extends StatelessWidget {
  const TiendaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aros y Llantas',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFFFF5100)),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  String _baseUrl = defaultBaseUrl();
  String _selectedProduct = '';
  Map<String, dynamic>? _adminUser;
  String _adminSessionId = '';
  String _adminCsrfToken = '';

  void _onAdminLogin(Map<String, dynamic> user, String sessionId, String csrf) {
    setState(() {
      _adminUser = user;
      _adminSessionId = sessionId;
      _adminCsrfToken = csrf;
    });
  }

  void _onAdminLogout() {
    setState(() {
      _adminUser = null;
      _adminSessionId = '';
      _adminCsrfToken = '';
    });
  }

  void _openContactForProduct(String productName) {
    setState(() {
      _selectedProduct = productName;
      _currentIndex = 2;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isAdmin = _currentIndex == 3;
    const primaryOrange = Color(0xFFFF5100);
    const backgroundDark = Color(0xFF0B0B0B);
    const surfaceDark = Color(0xFF151515);
    const surfaceBlue = Color(0xFF0F1A26);
    final publicTheme = ThemeData.dark().copyWith(
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryOrange,
        brightness: Brightness.dark,
      ),
      scaffoldBackgroundColor: backgroundDark,
      cardColor: surfaceDark,
      appBarTheme: const AppBarTheme(
        backgroundColor: backgroundDark,
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      navigationBarTheme: const NavigationBarThemeData(
        backgroundColor: backgroundDark,
        indicatorColor: Color(0xFF1C1C1C),
      ),
      textTheme: Theme.of(context).textTheme.apply(
            bodyColor: Colors.white,
            displayColor: Colors.white,
          ),
      useMaterial3: true,
    );
    final pages = [
      BrandsPage(baseUrl: _baseUrl),
      ProductsPage(baseUrl: _baseUrl, onContact: _openContactForProduct),
      ContactPage(baseUrl: _baseUrl, productName: _selectedProduct),
      AdminHomePage(
        baseUrl: _baseUrl,
        user: _adminUser,
        sessionId: _adminSessionId,
        csrfToken: _adminCsrfToken,
        onLogin: _onAdminLogin,
        onLogout: _onAdminLogout,
      ),
    ];

    final scaffold = Scaffold(
      appBar: AppBar(
        title: const Text('Tienda Aros y Llantas'),
      ),
      body: pages[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) => setState(() => _currentIndex = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home), label: 'Inicio'),
          NavigationDestination(icon: Icon(Icons.shopping_bag), label: 'Productos'),
          NavigationDestination(icon: Icon(Icons.message), label: 'Contactar'),
          NavigationDestination(icon: Icon(Icons.lock), label: 'Admin'),
        ],
      ),
    );
    return isAdmin ? scaffold : Theme(data: publicTheme, child: scaffold);
  }
}

class BrandItem {
  BrandItem({
    required this.name,
    required this.description,
    required this.logoUrl,
  });

  final String name;
  final String description;
  final String logoUrl;

  factory BrandItem.fromJson(Map<String, dynamic> json, String baseUrl) {
    final logoValue = json['logo_url'] ?? json['logo'] ?? '';
    final logo = logoValue.toString();
    final normalized = logo.startsWith('http') ? logo : '$baseUrl$logo';
    return BrandItem(
      name: (json['name'] ?? json['title'] ?? 'Marca').toString(),
      description: (json['description'] ?? json['brief'] ?? '').toString(),
      logoUrl: normalized,
    );
  }
}

class ProductItem {
  ProductItem({
    required this.name,
    required this.description,
    required this.imageUrl,
  });

  final String name;
  final String description;
  final String imageUrl;

  factory ProductItem.fromJson(Map<String, dynamic> json, String baseUrl) {
    final imageValue = json['image_url'] ?? json['image'] ?? '';
    final image = imageValue.toString();
    final normalized = image.startsWith('http') ? image : '$baseUrl$image';
    return ProductItem(
      name: (json['name'] ?? json['title'] ?? 'Producto').toString(),
      description: (json['description'] ?? json['brief'] ?? '').toString(),
      imageUrl: normalized,
    );
  }
}

class HighlightItem {
  const HighlightItem({
    required this.icon,
    required this.title,
    required this.description,
  });

  final IconData icon;
  final String title;
  final String description;
}

class BrandsPage extends StatefulWidget {
  const BrandsPage({super.key, required this.baseUrl});

  final String baseUrl;

  @override
  State<BrandsPage> createState() => _BrandsPageState();
}

class _BrandsPageState extends State<BrandsPage> {
  late Future<List<BrandItem>> _brandsFuture;
  final List<HighlightItem> _highlights = const [
    HighlightItem(
      icon: Icons.directions_car,
      title: 'Llantas premium',
      description: 'Marcas originales con garantía y alto rendimiento.',
    ),
    HighlightItem(
      icon: Icons.auto_fix_high,
      title: 'Instalación',
      description: 'Montaje y balanceo profesional en el mismo día.',
    ),
    HighlightItem(
      icon: Icons.shield,
      title: 'Seguridad',
      description: 'Asesoría técnica para elegir la mejor opción.',
    ),
  ];

  @override
  void initState() {
    super.initState();
    _brandsFuture = _loadBrands();
  }

  @override
  void didUpdateWidget(covariant BrandsPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.baseUrl != widget.baseUrl) {
      _brandsFuture = _loadBrands();
    }
  }

  Future<List<BrandItem>> _loadBrands() async {
    try {
      final response = await http
          .get(Uri.parse('${widget.baseUrl}/api/brands/'))
          .timeout(const Duration(seconds: 10));
      if (response.statusCode != 200) {
        throw Exception(
          'HTTP ${response.statusCode}: ${response.body.isEmpty ? 'Sin cuerpo' : response.body}',
        );
      }
      final data = jsonDecode(response.body);
      final items = data is List ? data : (data['results'] ?? []);
      return (items as List)
          .map((item) => BrandItem.fromJson(item, widget.baseUrl))
          .toList();
    } on TimeoutException {
      throw Exception('Tiempo de espera agotado');
    } catch (error) {
      throw Exception('Error de red: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async {
        setState(() => _brandsFuture = _loadBrands());
        await _brandsFuture;
      },
      child: FutureBuilder<List<BrandItem>>(
        future: _brandsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(
              child: Text(
                'Error cargando marcas:\n${snapshot.error}',
                style: Theme.of(context).textTheme.bodyLarge,
                textAlign: TextAlign.center,
              ),
            );
          }
          final brands = snapshot.data ?? [];
          return CustomScrollView(
            slivers: [
              SliverToBoxAdapter(child: _buildHero(context)),
              SliverToBoxAdapter(child: _buildHighlights(context)),
              SliverToBoxAdapter(
                child: _buildSectionTitle(context, 'Marcas destacadas'),
              ),
              if (brands.isEmpty)
                const SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.all(24),
                    child: Center(child: Text('Sin marcas')),
                  ),
                )
              else
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) {
                      final brand = brands[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                        child: ListTile(
                          leading: brand.logoUrl.isNotEmpty
                              ? Image.network(
                                  brand.logoUrl,
                                  width: 56,
                                  height: 56,
                                  errorBuilder: (_, __, ___) =>
                                      const Icon(Icons.image_not_supported),
                                )
                              : const Icon(Icons.image_not_supported),
                          title: Text(brand.name),
                          subtitle: Text(brand.description),
                        ),
                      );
                    },
                    childCount: brands.length,
                  ),
                ),
              SliverToBoxAdapter(
                child: _buildSectionTitle(context, 'Servicios destacados'),
              ),
              SliverToBoxAdapter(child: _buildServices(context)),
              SliverToBoxAdapter(child: _buildCta(context)),
              const SliverToBoxAdapter(child: SizedBox(height: 24)),
            ],
          );
        },
      ),
    );
  }

  Widget _buildHero(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 28),
      margin: const EdgeInsets.fromLTRB(16, 8, 16, 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: const Color(0xFF111111),
        border: Border.all(color: const Color(0xFF2A2A2A)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Aros & Llantas Metamorfosis',
            style: Theme.of(context)
                .textTheme
                .headlineSmall
                ?.copyWith(color: Colors.white),
          ),
          const SizedBox(height: 8),
          Text(
            'Marcas deportivas, servicio profesional y entrega rápida.',
            style: Theme.of(context)
                .textTheme
                .bodyMedium
                ?.copyWith(color: const Color(0xFFB0B0B0)),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: scheme.primary,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(24),
              ),
            ),
            onPressed: () {},
            child: const Text('Ver marcas'),
          ),
        ],
      ),
    );
  }

  Widget _buildHighlights(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      child: Row(
        children: _highlights.map((item) {
          return Expanded(
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 6),
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: const Color(0xFF111111),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF2A2A2A)),
              ),
              child: Column(
                children: [
                  Icon(item.icon, color: Theme.of(context).colorScheme.primary),
                  const SizedBox(height: 6),
                  Text(
                    item.title,
                    textAlign: TextAlign.center,
                    style: Theme.of(context)
                        .textTheme
                        .labelLarge
                        ?.copyWith(color: Colors.white),
                  ),
                ],
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildSectionTitle(BuildContext context, String title) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 8),
      child: Text(
        title,
        style: Theme.of(context)
            .textTheme
            .titleLarge
            ?.copyWith(color: Colors.white),
      ),
    );
  }

  Widget _buildServices(BuildContext context) {
    final services = const [
      HighlightItem(
        icon: Icons.settings,
        title: 'Alineación',
        description: 'Ajuste preciso para máxima estabilidad.',
      ),
      HighlightItem(
        icon: Icons.handshake,
        title: 'Asesoría',
        description: 'Te ayudamos a elegir tu set ideal.',
      ),
      HighlightItem(
        icon: Icons.local_shipping,
        title: 'Entrega',
        description: 'Despacho rápido a tu ciudad.',
      ),
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Wrap(
        spacing: 12,
        runSpacing: 12,
        children: services.map((service) {
          return Container(
            width: (MediaQuery.of(context).size.width - 44) / 2,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFF0F1A26),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFF1F2A38)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(service.icon,
                    color: Theme.of(context).colorScheme.primary),
                const SizedBox(height: 8),
                Text(
                  service.title,
                  style: Theme.of(context)
                      .textTheme
                      .titleMedium
                      ?.copyWith(color: Colors.white),
                ),
                const SizedBox(height: 4),
                Text(
                  service.description,
                  style: Theme.of(context)
                      .textTheme
                      .bodySmall
                      ?.copyWith(color: const Color(0xFFB0B0B0)),
                ),
              ],
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildCta(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 4),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: const Color(0xFF111111),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFF2A2A2A)),
        ),
        child: Row(
          children: [
            Icon(
              Icons.support_agent,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                '¿Necesitas asesoría? Escríbenos y te ayudamos a elegir.',
                style: Theme.of(context)
                    .textTheme
                    .bodyMedium
                    ?.copyWith(color: const Color(0xFFD0D0D0)),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ProductsPage extends StatefulWidget {
  const ProductsPage({super.key, required this.baseUrl, required this.onContact});

  final String baseUrl;
  final void Function(String productName) onContact;

  @override
  State<ProductsPage> createState() => _ProductsPageState();
}

class _ProductsPageState extends State<ProductsPage> {
  late Future<List<ProductItem>> _productsFuture;

  @override
  void initState() {
    super.initState();
    _productsFuture = _loadProducts();
  }

  @override
  void didUpdateWidget(covariant ProductsPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.baseUrl != widget.baseUrl) {
      _productsFuture = _loadProducts();
    }
  }

  Future<List<ProductItem>> _loadProducts() async {
    try {
      final response = await http
          .get(Uri.parse('${widget.baseUrl}/api/products/'))
          .timeout(const Duration(seconds: 10));
      if (response.statusCode != 200) {
        throw Exception(
          'HTTP ${response.statusCode}: ${response.body.isEmpty ? 'Sin cuerpo' : response.body}',
        );
      }
      final data = jsonDecode(response.body);
      final items = data is List ? data : (data['results'] ?? []);
      return (items as List)
          .map((item) => ProductItem.fromJson(item, widget.baseUrl))
          .toList();
    } on TimeoutException {
      throw Exception('Tiempo de espera agotado');
    } catch (error) {
      throw Exception('Error de red: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: () async {
        setState(() => _productsFuture = _loadProducts());
        await _productsFuture;
      },
      child: FutureBuilder<List<ProductItem>>(
        future: _productsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(
              child: Text(
                'Error cargando productos:\n${snapshot.error}',
                textAlign: TextAlign.center,
              ),
            );
          }
          final products = snapshot.data ?? [];
          if (products.isEmpty) {
            return const Center(child: Text('Sin productos'));
          }
          return ListView.builder(
            itemCount: products.length,
            itemBuilder: (context, index) {
              final product = products[index];
              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                child: ListTile(
                  leading: product.imageUrl.isNotEmpty
                      ? Image.network(product.imageUrl, width: 56, height: 56)
                      : const Icon(Icons.image),
                  title: Text(product.name),
                  subtitle: Text(product.description),
                  trailing: ElevatedButton(
                    onPressed: () => widget.onContact(product.name),
                    child: const Text('Pedir'),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class AdminLoginPage extends StatefulWidget {
  const AdminLoginPage({super.key, required this.baseUrl});

  final String baseUrl;

  @override
  State<AdminLoginPage> createState() => _AdminLoginPageState();
}

class _AdminLoginPageState extends State<AdminLoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _loading = false;
  String? _error;
  Map<String, dynamic>? _user;
  String _cookie = '';

  Future<void> _login() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    setState(() {
      _loading = true;
      _error = null;
    });

    try {
      final response = await http
          .post(
            Uri.parse('${widget.baseUrl}/api/login/'),
            headers: const {'Content-Type': 'application/json'},
            body: jsonEncode({
              'email': _emailController.text.trim(),
              'password': _passwordController.text.trim(),
            }),
          )
          .timeout(const Duration(seconds: 10));

      if (response.statusCode >= 200 && response.statusCode < 300) {
        final data = jsonDecode(response.body) as Map<String, dynamic>;
        final rawCookie = response.headers['set-cookie'];
        setState(() {
          _user = data;
          _cookie = rawCookie?.split(';').first ?? '';
        });
      } else {
        setState(() {
          _error = response.body.isNotEmpty
              ? response.body
              : 'Credenciales inválidas.';
        });
      }
    } on TimeoutException {
      setState(() => _error = 'Tiempo de espera agotado.');
    } catch (error) {
      setState(() => _error = 'Error de red: $error');
    } finally {
      if (mounted) {
        setState(() => _loading = false);
      }
    }
  }

  Future<void> _logout() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      await http
          .post(
            Uri.parse('${widget.baseUrl}/api/logout/'),
            headers: _cookie.isNotEmpty ? {'Cookie': _cookie} : null,
          )
          .timeout(const Duration(seconds: 10));
    } catch (_) {
    } finally {
      if (mounted) {
        setState(() {
          _loading = false;
          _user = null;
          _cookie = '';
          _passwordController.clear();
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_user != null) {
      return SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Administrador',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _user?['name']?.toString() ?? 'Usuario',
                      style: Theme.of(context).textTheme.titleMedium,
                    ),
                    const SizedBox(height: 6),
                    Text(_user?['email']?.toString() ?? ''),
                    const SizedBox(height: 6),
                    Text(
                      'Rol: ${_user?['role_name']?.toString() ?? 'N/A'}',
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            Card(
              color: Theme.of(context).colorScheme.primaryContainer,
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Row(
                  children: [
                    Icon(
                      Icons.admin_panel_settings,
                      color:
                          Theme.of(context).colorScheme.onPrimaryContainer,
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        'Panel web: ${widget.baseUrl}/admin/',
                        style: Theme.of(context)
                            .textTheme
                            .bodyMedium
                            ?.copyWith(
                              color: Theme.of(context)
                                  .colorScheme
                                  .onPrimaryContainer,
                            ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _loading ? null : _logout,
                child: const Text('Cerrar sesión'),
              ),
            ),
          ],
        ),
      );
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Acceso administrador',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Correo'),
              validator: (value) =>
                  value == null || value.isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _passwordController,
              decoration: const InputDecoration(labelText: 'Contraseña'),
              obscureText: true,
              validator: (value) =>
                  value == null || value.isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            if (_error != null)
              Text(
                _error!,
                style: TextStyle(color: Theme.of(context).colorScheme.error),
              ),
            const SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _loading ? null : _login,
                child: Text(_loading ? 'Ingresando...' : 'Ingresar'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ContactPage extends StatefulWidget {
  const ContactPage({
    super.key,
    required this.baseUrl,
    required this.productName,
  });

  final String baseUrl;
  final String productName;

  @override
  State<ContactPage> createState() => _ContactPageState();
}

class _ContactPageState extends State<ContactPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _cityController = TextEditingController();
  final _phoneController = TextEditingController();
  final _quantityController = TextEditingController(text: '1');
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();

  bool _submitting = false;

  @override
  void didUpdateWidget(covariant ContactPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.productName != widget.productName &&
        widget.productName.isNotEmpty) {
      _subjectController.text = 'Compra de ${widget.productName}';
      _messageController.text = 'Me interesa comprar ${widget.productName}.';
      _quantityController.text = '1';
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }
    setState(() => _submitting = true);
    try {
      final quantity = _quantityController.text.trim();
      final product = widget.productName.trim();
      var message = _messageController.text.trim();
      if (product.isNotEmpty) {
        final qty = quantity.isNotEmpty ? ' Cantidad: $quantity.' : '';
        if (!message.toLowerCase().contains('me interesa comprar')) {
          message = 'Me interesa comprar $product.$qty $message'.trim();
        } else if (qty.isNotEmpty && !message.contains('Cantidad')) {
          message = '$message $qty'.trim();
        }
      }
      final response = await http.post(
        Uri.parse('${widget.baseUrl}/api/contacts/'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': _nameController.text.trim(),
          'email': _emailController.text.trim(),
          'city': _cityController.text.trim(),
          'phone': _phoneController.text.trim(),
          'subject': _subjectController.text.trim(),
          'message': message,
        }),
      );
      if (!mounted) return;
      if (response.statusCode >= 200 && response.statusCode < 300) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Mensaje enviado.')),
        );
        _formKey.currentState!.reset();
        _quantityController.text = '1';
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('No se pudo enviar.')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _submitting = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Form(
        key: _formKey,
        child: Column(
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Nombres'),
              validator: (value) =>
                  value == null || value.isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Correo'),
              validator: (value) =>
                  value == null || value.isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _cityController,
              decoration: const InputDecoration(labelText: 'Ciudad'),
              validator: (value) =>
                  value == null || value.isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _phoneController,
              decoration: const InputDecoration(labelText: 'Celular'),
              validator: (value) =>
                  value == null || value.isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _quantityController,
              decoration: const InputDecoration(labelText: 'Cantidad'),
              keyboardType: TextInputType.number,
              validator: (value) =>
                  value == null || value.isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _subjectController,
              decoration: const InputDecoration(labelText: 'Solicitud'),
              validator: (value) =>
                  value == null || value.isEmpty ? 'Requerido' : null,
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _messageController,
              decoration: const InputDecoration(labelText: 'Mensaje'),
              maxLines: 4,
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _submitting ? null : _submit,
                child: Text(_submitting ? 'Enviando...' : 'Enviar solicitud'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
