import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { ADMIN_RESOURCES } from "./resources";

type AdminItem = {
  id?: number | string;
  name?: string;
  title?: string;
  description?: string;
  brief?: string;
  email?: string;
  username?: string;
  product?: { id?: number | string; name?: string };
  [key: string]: unknown;
};

type FormField = {
  key: string;
  value: string;
  type:
    | "text"
    | "textarea"
    | "number"
    | "boolean"
    | "email"
    | "tel"
    | "password"
    | "file"
    | "select";
  file?: File | null;
  options?: { label: string; value: string }[];
};

const inferFieldType = (key: string, value: unknown): FormField["type"] => {
  const lowerKey = key.toLowerCase();
  if (lowerKey === "product_id") {
    return "select";
  }
  if (
    lowerKey.includes("image") ||
    lowerKey.includes("logo") ||
    lowerKey.includes("photo") ||
    lowerKey.includes("avatar") ||
    lowerKey.includes("file")
  ) {
    return "file";
  }
  if (typeof value === "number") {
    return "number";
  }
  if (typeof value === "boolean") {
    return "boolean";
  }
  if (lowerKey.includes("description") || lowerKey.includes("brief") || lowerKey.includes("message")) {
    return "textarea";
  }
  if (lowerKey.includes("email")) {
    return "email";
  }
  if (lowerKey.includes("phone") || lowerKey.includes("celular")) {
    return "tel";
  }
  if (lowerKey.includes("password")) {
    return "password";
  }
  if (
    lowerKey.includes("price") ||
    lowerKey.includes("amount") ||
    lowerKey.includes("stock") ||
    lowerKey.includes("quantity") ||
    lowerKey.endsWith("_id")
  ) {
    return "number";
  }
  if (lowerKey.startsWith("is_") || lowerKey.startsWith("has_")) {
    return "boolean";
  }
  return "text";
};

const toFormFields = (item: AdminItem) =>
  Object.entries(item)
    .filter(([key]) => key !== "id" && key !== "product")
    .map(([key, value]) => ({
      key,
      value:
        value === null || value === undefined ? "" : String(value),
      type: inferFieldType(key, value),
      file: null,
    }));

const FIELD_LABELS: Record<string, string> = {
  name: "Nombre",
  title: "Titulo",
  description: "Descripcion",
  brief: "Descripcion corta",
  email: "Correo",
  username: "Usuario",
  password: "Contrasena",
  phone: "Celular",
  city: "Ciudad",
  address: "Direccion",
  price: "Precio",
  stock: "Stock",
  quantity: "Cantidad",
  product_id: "Producto",
  image: "Imagen",
  image_url: "Imagen",
  logo: "Logo",
  logo_url: "Logo",
  subject: "Asunto",
  message: "Mensaje",
  status: "Estado",
};

const getFieldLabel = (key: string) => {
  if (!key) {
    return "Campo";
  }
  const normalized = key.toLowerCase();
  if (FIELD_LABELS[normalized]) {
    return FIELD_LABELS[normalized];
  }
  return normalized
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const defaultFields = (resourceKey?: string) => {
  const baseFields: FormField[] = [
    { key: "name", value: "", type: "text" },
    { key: "description", value: "", type: "textarea" },
  ];

  if (resourceKey === "inventory") {
    return [
      { key: "product_id", value: "", type: "select", options: [] },
      { key: "quantity", value: "", type: "number" },
    ];
  }

  if (resourceKey === "users") {
    return [
      { key: "email", value: "", type: "email" },
      { key: "password", value: "", type: "password" },
      { key: "username", value: "", type: "text" },
    ];
  }

  return baseFields;
};

const AdminResource = () => {
  const { resourceKey } = useParams();
  const resource = useMemo(
    () => ADMIN_RESOURCES.find((item) => item.key === resourceKey),
    [resourceKey]
  );
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formMode, setFormMode] = useState<"create" | "edit" | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [productOptions, setProductOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const fetchItems = async () => {
    if (!resource) {
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}${resource.endpoint}`, {
        credentials: "include",
      });
      if (!response.ok) {
        setError("No se pudo cargar la informacion.");
        return;
      }
      const data = await response.json();
      const list = Array.isArray(data) ? data : data?.results || [];
      setItems(list);
    } catch (fetchError) {
      setError("No se pudo cargar la informacion.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [resourceKey]);

  useEffect(() => {
    const shouldLoadProducts =
      resourceKey === "inventory" ||
      fields.some((field) => field.key === "product_id");

    if (!shouldLoadProducts) {
      return;
    }

    const loadProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/products/`, {
          credentials: "include",
        });
        if (!response.ok) {
          return;
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data?.results || [];
        const options = list
          .map((product: AdminItem) => ({
            label: product.name || product.title || `ID ${product.id ?? ""}`,
            value: String(product.id ?? ""),
          }))
          .filter((item: { label: string; value: string }) => item.value);
        setProductOptions(options);
      } catch (loadError) {
        // ignore load errors
      }
    };

    loadProducts();
  }, [resourceKey, fields]);

  const openCreate = () => {
    setFormMode("create");
    setSelectedItem(null);
    const initialFields = defaultFields(resourceKey);
    setFields(
      initialFields.map((field) =>
        field.key === "product_id"
          ? { ...field, options: productOptions }
          : field
      )
    );
  };

  const openEdit = (item: AdminItem) => {
    setFormMode("edit");
    setSelectedItem(item);
    const mapped = toFormFields(item).map((field) =>
      field.key === "product_id"
        ? { ...field, options: productOptions }
        : field
    );
    if (resourceKey === "inventory" && item.product?.id) {
      const hasProductField = mapped.some((field) => field.key === "product_id");
      if (!hasProductField) {
        mapped.unshift({
          key: "product_id",
          value: String(item.product.id),
          type: "select",
          options: productOptions,
        });
      }
    }
    setFields(mapped);
  };

  const handleSave = async () => {
    if (!resource) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      const hasFile = fields.some((field) => field.type === "file" && field.file);

      const payload = fields.reduce<Record<string, unknown>>((acc, field) => {
        const trimmedKey = field.key.trim();
        if (!trimmedKey) {
          return acc;
        }
        if (field.type === "file") {
          if (field.file) {
            acc[trimmedKey] = field.file;
          }
          return acc;
        }
        if (field.type === "select") {
          acc[trimmedKey] = field.value.trim() === "" ? null : Number(field.value);
          return acc;
        }
        if (field.type === "number") {
          acc[trimmedKey] = field.value.trim() === "" ? null : Number(field.value);
          return acc;
        }
        if (field.type === "boolean") {
          acc[trimmedKey] = field.value === "true";
          return acc;
        }
        acc[trimmedKey] = field.value;
        return acc;
      }, {});

      const buildFormData = () => {
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value === null || value === undefined) {
            return;
          }
          if (value instanceof File) {
            formData.append(key, value);
            return;
          }
          formData.append(key, String(value));
        });
        return formData;
      };

      if (formMode === "create") {
        const body = hasFile ? buildFormData() : JSON.stringify(payload);
        const response = await fetch(`${API_BASE_URL}${resource.endpoint}`, {
          method: "POST",
          headers: hasFile
            ? {
                Accept: "application/json",
              }
            : {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
          credentials: "include",
          body,
        });
        if (!response.ok) {
          setError("No se pudo guardar.");
          return;
        }
      }

      if (formMode === "edit" && selectedItem?.id) {
        const body = hasFile ? buildFormData() : JSON.stringify(payload);
        const response = await fetch(
          `${API_BASE_URL}${resource.endpoint}${selectedItem.id}/`,
          {
            method: "PATCH",
            headers: hasFile
              ? {
                  Accept: "application/json",
                }
              : {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
            credentials: "include",
            body,
          }
        );
        if (!response.ok) {
          setError("No se pudo actualizar.");
          return;
        }
      }

      setFormMode(null);
      setSelectedItem(null);
      await fetchItems();
    } catch (saveError) {
      setError("Formulario invalido o error al guardar.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: AdminItem) => {
    if (!resource || !item.id) {
      return;
    }
    const ok = window.confirm("Deseas eliminar este registro?");
    if (!ok) {
      return;
    }
    setError("");
    try {
      const response = await fetch(
        `${API_BASE_URL}${resource.endpoint}${item.id}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        setError("No se pudo eliminar.");
        return;
      }
      await fetchItems();
    } catch (deleteError) {
      setError("No se pudo eliminar.");
    }
  };

  if (!resource) {
    return <div>Seccion no encontrada.</div>;
  }

  return (
    <div>
      <div className="admin-page-header flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold uppercase tracking-wide text-white">
            {resource.label}
          </h2>
          <p className="text-sm text-slate-300 md:text-slate-400 mt-1">
            {resource.endpoint}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={fetchItems}
            className="admin-action-btn"
          >
            Recargar
          </button>
          <button
            onClick={openCreate}
            className="admin-action-btn primary"
          >
            Crear
          </button>
        </div>
      </div>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <div className="admin-form-card">
        {loading ? (
          <div className="p-6 text-slate-300">Cargando...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-slate-300">Sin registros.</div>
        ) : (
          <div className="divide-y divide-[#1b1b1b]">
            {items.map((item) => {
              const label =
                item.name ||
                item.title ||
                item.email ||
                item.username ||
                item.product?.name ||
                `ID ${item.id ?? ""}`;
              const description = item.description || item.brief || "";
              return (
                <div
                  key={String(item.id ?? label)}
                  className="admin-list-item"
                >
                  <div className="space-y-1">
                    <div className="text-lg font-semibold text-white">
                      {label}
                    </div>
                    {description && (
                      <div className="text-sm text-slate-300">
                        {description}
                      </div>
                    )}
                  </div>
                  <div className="admin-list-actions flex flex-col gap-2 md:flex-row">
                    <button
                      className="admin-action-btn"
                      onClick={() => openEdit(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="admin-action-btn"
                      onClick={() => handleDelete(item)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {formMode && (
        <div className="mt-6 admin-form-card">
          <div className="text-lg font-semibold mb-4 uppercase tracking-wide">
            {formMode === "create" ? "Crear registro" : "Editar registro"}
          </div>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={`${field.key}-${index}`}
                className="grid grid-cols-12 gap-4 items-start"
              >
                <div className="col-span-12 md:col-span-4">
                  <div className="w-full bg-[#111827] border border-[#1f2937] text-white h-[44px] px-4 flex items-center rounded">
                    {getFieldLabel(field.key)}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                  {field.type === "textarea" ? (
                    <textarea
                      className="admin-textarea focus:outline-none focus:border-[#2563eb]"
                      value={field.value}
                      onChange={(event) => {
                        const value = event.target.value;
                        setFields((prev) =>
                          prev.map((item, idx) =>
                            idx === index ? { ...item, value } : item
                          )
                        );
                      }}
                      placeholder="Valor"
                    ></textarea>
                  ) : field.type === "boolean" ? (
                    <select
                      className="admin-input focus:outline-none focus:border-[#2563eb]"
                      value={field.value}
                      onChange={(event) => {
                        const value = event.target.value;
                        setFields((prev) =>
                          prev.map((item, idx) =>
                            idx === index ? { ...item, value } : item
                          )
                        );
                      }}
                    >
                      <option value="true">Si</option>
                      <option value="false">No</option>
                    </select>
                  ) : field.type === "select" ? (
                    <select
                      className="admin-input focus:outline-none focus:border-[#2563eb]"
                      value={field.value}
                      onChange={(event) => {
                        const value = event.target.value;
                        setFields((prev) =>
                          prev.map((item, idx) =>
                            idx === index ? { ...item, value } : item
                          )
                        );
                      }}
                    >
                      <option value="">Selecciona</option>
                      {(field.options || productOptions).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <div className="space-y-2">
                      <input
                        className="admin-input focus:outline-none focus:border-[#2563eb]"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0] || null;
                          setFields((prev) =>
                            prev.map((item, idx) =>
                              idx === index ? { ...item, file } : item
                            )
                          );
                        }}
                      />
                      {field.value && (
                        <div className="text-xs text-slate-300 break-all">
                          Actual: {field.value}
                        </div>
                      )}
                    </div>
                  ) : (
                    <input
                      className="admin-input focus:outline-none focus:border-[#2563eb]"
                      type={field.type}
                      value={field.value}
                      onChange={(event) => {
                        const value = event.target.value;
                        setFields((prev) =>
                          prev.map((item, idx) =>
                            idx === index ? { ...item, value } : item
                          )
                        );
                      }}
                      placeholder="Valor"
                    />
                  )}
                </div>
                <div className="col-span-12 md:col-span-2 flex md:justify-end">
                  <button
                    className="px-3 py-2 border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-white transition-all duration-200"
                    onClick={() =>
                      setFields((prev) => prev.filter((_, idx) => idx !== index))
                    }
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 bg-[#2563eb] rounded hover:opacity-90 transition-all duration-200"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              className="px-4 py-2 border border-slate-600 rounded hover:bg-[#111827] transition-all duration-200"
              onClick={() => {
                setFormMode(null);
                setSelectedItem(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminResource;
