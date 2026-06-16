export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <h1 className="text-2xl font-bold text-blue-600">
        Property Hub
      </h1>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/properties">Properties</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </nav>
  );
}