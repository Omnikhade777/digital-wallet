import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const features = [
    {
      title: "Secure Payments",
      desc: "Multiple layers of security & 24×7 fraud monitoring to protect your money.",
    },
    {
      title: "UPI & Wallet",
      desc: "Send and receive money instantly with UPI or Paytm Wallet.",
    },
    {
      title: "Rewards & Offers",
      desc: "Earn cashback and enjoy exclusive deals every time you pay.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#cbd5e1] text-gray-800 font-sans">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-4 md:px-6">
          <a href="/" className="text-xl font-bold text-gray-900">Paytm</a>
          <div className="space-x-4">
            <button onClick={handleSignIn} className="px-4 py-2 text-gray-600 font-medium hover:underline">
              Sign In
            </button>
            <button onClick={handleSignUp} className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <section className="text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Welcome to Paytm</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
          Recharge, pay bills, book tickets, and manage your money — all in one secure app.
        </p>
        <button
          onClick={handleSignUp}
          className="inline-block px-8 py-3 bg-gray-900 text-white text-lg rounded-md shadow hover:bg-gray-800 transition"
        >
          Get Started
        </button>
      </section>

      <main className="px-4 md:px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Us?</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, desc }) => (
            <div key={title} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <section className="mt-20 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">About Paytm</h2>
          <p className="text-gray-700 leading-relaxed">
            We are committed to making digital payments seamless and accessible to everyone.
            Trusted by millions, Paytm is your one-stop app for fast, secure, and rewarding transactions.
          </p>
        </section>
      </main>
    </div>
  );
};
