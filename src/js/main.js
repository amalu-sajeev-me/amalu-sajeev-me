async function connectToDatabase() {
  const { origin } = new URL(location.href);
  const databaseURL = new URL(`${origin}/src/db/db.json`);
  const internalDatabase = await fetch(databaseURL)
    .then((response) => response.json())
    .catch((error) => console.log("database fetch failed\n", error.message));

  if (!internalDatabase) return false;
  globalThis.internalDB = internalDatabase;
  return internalDatabase;
}

export { connectToDatabase };
