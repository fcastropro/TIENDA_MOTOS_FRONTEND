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
  [key: string]: unknown;
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
  const [formJson, setFormJson] = useState<string>("{}");
  const [selectedItem, setSelectedItem] = useState<AdminItem | null>(null);
  const [saving, setSaving] = useState(false);

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

  const openCreate = () => {
    setFormMode("create");
    setSelectedItem(null);
    setFormJson("{\n  \"name\": \"\"\n}");
  };

  const openEdit = (item: AdminItem) => {
    setFormMode("edit");
    setSelectedItem(item);
    setFormJson(JSON.stringify(item, null, 2));
  };

  const handleSave = async () => {
    if (!resource) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = JSON.parse(formJson);
      if (formMode === "create") {
        const response = await fetch(`${API_BASE_URL}${resource.endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          setError("No se pudo guardar.");
          return;
        }
      }

      if (formMode === "edit" && selectedItem?.id) {
        const response = await fetch(
          `${API_BASE_URL}${resource.endpoint}${selectedItem.id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify(payload),
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
      setError("JSON invalido o error al guardar.");
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold uppercase">{resource.label}</h2>
          <p className="text-sm text-[#8f8f8f]">{resource.endpoint}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchItems}
            className="px-4 py-2 border border-[#595959] rounded hover:bg-[#1a1a1a]"
          >
            Recargar
          </button>
          <button
            onClick={openCreate}
            className="px-4 py-2 bg-[#ff5100] rounded text-white"
          >
            Crear
          </button>
        </div>
      </div>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <div className="bg-[#070707] border border-[#1b1b1b] rounded">
        {loading ? (
          <div className="p-6 text-[#bdbdbd]">Cargando...</div>
        ) : items.length === 0 ? (
          <div className="p-6 text-[#bdbdbd]">Sin registros.</div>
        ) : (
          <div className="divide-y divide-[#1b1b1b]">
            {items.map((item) => {
              const label =
                item.name ||
                item.title ||
                item.email ||
                item.username ||
                `ID ${item.id ?? ""}`;
              const description = item.description || item.brief || "";
              return (
                <div
                  key={String(item.id ?? label)}
                  className="p-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="text-lg font-semibold">{label}</div>
                    {description && (
                      <div className="text-sm text-[#8f8f8f]">
                        {description}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 border border-[#595959] rounded hover:bg-[#1a1a1a]"
                      onClick={() => openEdit(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-white"
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
        <div className="mt-6 bg-[#070707] border border-[#1b1b1b] rounded p-6">
          <div className="text-lg font-semibold mb-4">
            {formMode === "create" ? "Crear registro" : "Editar registro"}
          </div>
          <textarea
            className="w-full min-h-[240px] bg-black border border-[#595959] p-4 text-white font-mono"
            value={formJson}
            onChange={(event) => setFormJson(event.target.value)}
          ></textarea>
          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 bg-[#ff5100] rounded"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              className="px-4 py-2 border border-[#595959] rounded hover:bg-[#1a1a1a]"
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
