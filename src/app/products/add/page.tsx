"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Riwayat } from "../../../interfaces/riwayat";
import { Loader, Title, Alert, Table } from "@mantine/core";

const MaterialRiwayats = () => {
  const [riwayats, setRiwayats] = useState<Riwayat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/riwayat");
        setRiwayats(response.data);
      } catch (error) {
        setError("error fetching Riwayat : " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title>Riwayat Material</Title>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert color="red">{error}</Alert>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Deskripsi</th>
              <th>Jenis</th>
              <th>CreateAt</th>
            </tr>
          </thead>
          <tbody>
            {riwayats.map((riwayat) => (
              <tr key={riwayat.id}>
                <td>{riwayat.id}</td>
                <td>{riwayat.deskirpsi}</td>
                <td>{riwayat.jenis}</td>
                <td>{new Date(riwayat.createAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default MaterialRiwayats;
