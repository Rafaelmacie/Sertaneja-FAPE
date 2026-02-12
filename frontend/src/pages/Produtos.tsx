import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function Produtos() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Produtos
      </h1>

      <p className="text-gray-500 mb-8">
        ainda em desenvolvimento 🚧
      </p>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-[#00A859] text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

    </div>
  );
}
