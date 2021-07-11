import { IColumns } from "../table";

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const isCertified = ["YES", "NO"];
  const items = ["test", "test 2", "test 3", "test4"];
  return {
    itemName: items[Math.floor(Math.random() * 4)],
    sku: Math.floor(Math.random() * 10000),
    ean: Math.floor(Math.random() * 10000),
    quantity: Math.floor(Math.random() * 10000),
    singlePrice: Math.floor(Math.random() * 10000),
    packagePrice: Math.floor(Math.random() * 10000),
    discount: Math.floor(Math.random() * 10000),
    lbCertified: isCertified[Math.floor(Math.random() * isCertified.length)],
    bioCertifed: isCertified[Math.floor(Math.random() * isCertified.length)],
  };
};

const columns: IColumns[] = [
  {
    label: "Item Name",
    accessor: "itemName",
  },
  {
    label: "SKU",
    accessor: "sku",
  },
  {
    label: "EAN",
    accessor: "ean",
  },
  {
    label: "Quantity",
    accessor: "quantity",
  },
  {
    label: "Single Price",
    accessor: "singlePrice",
  },
  {
    label: "Package Price",
    accessor: "packagePrice",
  },
  {
    label: "Discount",
    accessor: "discount",
  },
  {
    label: "LB Certified",
    accessor: "lbCertified",
  },
  {
    label: "BIO Certified",
    accessor: "bioCertifed",
  },
];

export function makeData(...lens) {
  const makeDataLevel: any = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return { data: makeDataLevel(), columns: columns };
}
