

export const deleteCluster = (id: string) => {
  const validIds = [
    "60d5f60f8f8d8b7b0c2b7b7f",
    "60d5f60f8f8d8b7b0c2b7b80",
    "60d5f60f8f8d8b7b0c2b7b81",
    "60d5f60f8f8d8b7b0c2b7b82"
  ];

  if (validIds.includes(id)) {
    return { status: 'Deleting' };
  } else {
    throw new Error(`Cannot find cluster with ID: ${id}`);
  }
}