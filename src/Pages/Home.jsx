export default function Home({user, logout}) {
  return (
    <div className="home-container">
      <h1>Home</h1>
      <div className="home-components">
        <p>Welcome {user}</p>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
