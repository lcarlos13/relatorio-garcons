"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";


export default function Home() {
  const [relatorio, setRelatorio] = useState([]);
  const [loading, setLoading] = useState(false);

  async function buscarRelatorio() {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const dadosFake = [
      { garcom: "João", valor: 500 },
      { garcom: "João", valor: 300 },
      { garcom: "Maria", valor: 700 },
    ];

    const agrupado = {};

    dadosFake.forEach((item) => {
      if (!agrupado[item.garcom]) {
        agrupado[item.garcom] = 0;
      }
      agrupado[item.garcom] += item.valor;
    });

    const resultado = Object.keys(agrupado).map((nome) => {
      const total = agrupado[nome];
      return {
        nome,
        total,
        comissao: total * 0.07,
      };
    });

    setRelatorio(resultado);
    setLoading(false);
  }


  async function gerarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório de Garçons", 20, 20);

    doc.setFontSize(12);

    let y = 40;

    relatorio.forEach((item) => {
      doc.text(`Garçom: ${item.nome}`, 20, y);
      y += 8;

      doc.text(`Total: R$ ${item.total.toFixed(2)}`, 20, y);
      y += 8;

      doc.text(`Comissão: R$ ${item.comissao.toFixed(2)}`, 20, y);
      y += 12;
    });

    const pdfBlob = doc.output("blob");
    const file = new File([pdfBlob], "relatorio-garcons.pdf", {
      type: "application/pdf",
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "Relatório de Garçons",
        text: "Segue o relatório em PDF",
        files: [file],
      });
    } else {
      // Fallback universal
      const url = URL.createObjectURL(pdfBlob);
      window.open(url);
    }
  }



  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md">

        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Relatório de Garçons
          </h1>
          <p className="text-gray-600 mt-1">
            Total de vendas por período selecionado
          </p>
        </div>


        <button
          onClick={buscarRelatorio}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md active:scale-95 transition"
        >
          {loading ? "Carregando..." : "Buscar Relatório"}
        </button>

        <button
          onClick={gerarPDF}
          className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-lg active:scale-95 transition duration-200"
        >
          Gerar PDF
        </button>


        <div className="mt-6 space-y-4">
          {relatorio.map((item) => (
            <div
              key={item.nome}
              className="bg-white p-5 rounded-2xl shadow-md border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900">
                {item.nome}
              </h3>

              <div className="mt-3 space-y-1">
                <p className="text-gray-700">
                  Total vendido:
                  <span className="font-semibold ml-2 text-gray-900">
                    R$ {item.total.toFixed(2)}
                  </span>
                </p>

                <p className="text-green-600 font-bold">
                  Comissão (7%):
                  <span className="ml-2">
                    R$ {item.comissao.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>

          ))}
        </div>

      </div>
    </main>
  );
}
