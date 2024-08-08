export const getPreconData = async () => {
  const res = await fetch(
    "https://api.luxehomesbyfara.com/api/preconstructions/?page_size=4",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }
  const response = await res.json();
  // console.log(response.data);
  return response.results;
};
