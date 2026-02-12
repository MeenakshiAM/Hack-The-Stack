function Header({ data }) {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <h1>{data.eventName}</h1>
      <p>
        Last Updated: {new Date(data.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
}

export default Header;
