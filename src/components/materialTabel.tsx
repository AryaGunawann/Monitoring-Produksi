"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Material } from "../interfaces/material";
import { Loader, Alert, Title } from "@mantine/core";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";

const MaterialsTabel = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/materials");
        setMaterials(response.data);
      } catch (error) {
        setError("Error fetching materials: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 text-white">
        <Title order={1}>Daftar Material</Title>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Nama Material
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Satuan
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Jumlah
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {material.nama}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {material.satuan}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 flex">
                    {material.jumlah}
                    {material.jumlah < 0 ? (
                      <RiArrowDownSFill className="ml-1 text-red-500" />
                    ) : (
                      <RiArrowUpSFill className="ml-1 text-green-500" />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(material.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(material.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MaterialsTabel;
