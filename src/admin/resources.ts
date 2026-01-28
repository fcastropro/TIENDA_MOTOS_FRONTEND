export type AdminResource = {
  key: string;
  label: string;
  endpoint: string;
};

export const ADMIN_RESOURCES: AdminResource[] = [
  { key: "categories", label: "Categorias", endpoint: "/api/categories/" },
  { key: "brands", label: "Marcas", endpoint: "/api/brands/" },
  { key: "products", label: "Productos", endpoint: "/api/products/" },
  { key: "inventory", label: "Inventario", endpoint: "/api/inventory/" },
  { key: "suppliers", label: "Proveedores", endpoint: "/api/suppliers/" },
  { key: "purchases", label: "Compras", endpoint: "/api/purchases/" },
  {
    key: "purchase-details",
    label: "Detalle compras",
    endpoint: "/api/purchase-details/",
  },
  {
    key: "payment-methods",
    label: "Metodos de pago",
    endpoint: "/api/payment-methods/",
  },
  { key: "invoices", label: "Facturas", endpoint: "/api/invoices/" },
  {
    key: "invoice-details",
    label: "Detalle facturas",
    endpoint: "/api/invoice-details/",
  },
  { key: "roles", label: "Roles", endpoint: "/api/roles/" },
  { key: "users", label: "Usuarios", endpoint: "/api/users/" },
  { key: "contacts", label: "Contactos", endpoint: "/api/contacts/" },
];
