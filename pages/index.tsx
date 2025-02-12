
import { useState } from "react";

export default function EscoterosCalculator() {
  const [valor1, setValor1] = useState(0);
  const [valor2, setValor2] = useState(0);
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    setResultado(valor1 + valor2);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
        <h2 style={{ textAlign: 'center' }}>Calculadora de Escoteros</h2>
        <input
          type="number"
          placeholder="Introduce el primer valor"
          value={valor1}
          onChange={(e) => setValor1(Number(e.target.value))}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Introduce el segundo valor"
          value={valor2}
          onChange={(e) => setValor2(Number(e.target.value))}
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={calcular} style={{ width: '100%', padding: '10px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Calcular</button>
        {resultado !== null && (
          <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '18px' }}>Resultado: {resultado}</p>
        )}
      </div>
    </div>
  );
}
