"use client";
import { useState } from "react";
import { Menu, Group, Container, Burger } from "@mantine/core";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

const links = [
  { link: "/", label: "Dasbor" },
  { link: "/materials", label: "Materials" },
  { link: "/products", label: "Product" },
  { link: "/packing", label: "Packing" },
  { link: "/shipping", label: "Shipping" },

  {
    link: "",
    label: "Data",
    links: [
      { link: "/slipgaji", label: "SlipGaji" },
      { link: "/pegawai", label: "Pegawai" },
      { link: "/jabatan", label: "Jabatan" },
    ],
  },
];

export function HeaderMenu() {
  const [opened, setOpened] = useState(false);

  const toggle = () => {
    setOpened(!opened);
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Link
        key={item.link}
        href={item.link}
        className="block px-3 py-2 rounded text-sm font-medium text-black hover:text-white hover:bg-black"
      >
        {item.label}
      </Link>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link
              href="#"
              className="flex items-center px-3 py-2 rounded text-sm font-medium text-black hover:text-white hover:bg-black"
            >
              <span className="mr-1">{link.label}</span>
              <FiChevronDown className="w-4 h-4" />
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className="block px-3 py-2 rounded text-sm font-medium text-black hover:text-white hover:bg-black"
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className="mb-10 text-black shadow-lg">
      <Container size="md">
        <div className="h-14 flex justify-between items-center">
          <div className="text-lg font-bold">Monitoring Produksi</div>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          {/* Burger menu */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle menu"
          />
        </div>
        {/* Menu items for small screens */}
        {opened && (
          <div className="mt-2 pb-3 border-t border-gray-200">
            <Group gap={3}>{items}</Group>
          </div>
        )}
      </Container>
    </header>
  );
}
