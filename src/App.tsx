// Importa os módulos necessários do React
import React, { useState } from 'react';

// Importa a folha de estilo CSS
import './App.css';

// Define a interface para as propriedades dos pontos clicados
interface ClickedProps {
  clientX: number;
  clientY: number;
  size: number;
  color: string;
}

// Função para gerar uma cor aleatória em formato hexadecimal
function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Função para gerar um tamanho aleatório para os pontos clicados
function getRandomSize(): number {
  return Math.floor(Math.random() * 20) + 10; // Tamanho aleatório entre 10 e 30 pixels
}

// Componente principal da aplicação
function App() {
  // Estado para armazenar os pontos clicados
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
  
  // Estado para armazenar os pontos que foram desfeitos
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([]);

  // Função para obter as coordenadas do clique do mouse
  function getCoordinates(e: React.MouseEvent<HTMLElement>) {
    const { clientX, clientY } = e;

    const newClickedPoint: ClickedProps = {
      clientX,
      clientY,
      size: getRandomSize(),
      color: getRandomColor(),
    };

    // Adiciona o novo ponto clicado ao estado
    setClickedPoints([...clickedPoints, newClickedPoint]);
  }

  // Função para desfazer a última ação
  function handleUndo() {
    const newClickedPoint = [...clickedPoints];
    const undoPoint = newClickedPoint.pop();

    // Se não houver ponto para desfazer, retorna
    if (!undoPoint) return;

    // Atualiza o estado dos pontos clicados e desfeitos
    setClickedPoints(newClickedPoint);
    setUndoPoints([...undoPoints, undoPoint]);
  }

  // Função para refazer a última ação desfeita
  function handleRedo() {
    const newUndoPoints = [...undoPoints];
    const redoPoint = newUndoPoints.pop();

    // Se não houver ponto para refazer, retorna
    if (!redoPoint) return;

    // Atualiza o estado dos pontos desfeitos e clicados
    setUndoPoints(newUndoPoints);
    setClickedPoints([...clickedPoints, redoPoint]);
  }

  // Renderiza a interface da aplicação
  return (
    <>
      {/* Botão de desfazer, desabilitado se não houver pontos para desfazer */}
      <button disabled={clickedPoints.length === 0} onClick={handleUndo}>
        Desfazer
      </button>
      
      {/* Botão de refazer, desabilitado se não houver pontos para refazer */}
      <button disabled={undoPoints.length === 0} onClick={handleRedo}>
        Refazer
      </button>
      
      {/* Área de exibição dos pontos clicados */}
      <div className='App' onClick={getCoordinates}>
        {clickedPoints.map((clickedPoint, index) => (
          <div
            key={index}
            style={{
              left: clickedPoint.clientX - clickedPoint.size / 2,
              top: clickedPoint.clientY - clickedPoint.size / 2,
              position: 'absolute',
              borderRadius: '50%',
              background: clickedPoint.color,
              width: `${clickedPoint.size}px`,
              height: `${clickedPoint.size}px`,
              opacity: '50%',
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

// Exporta o componente principal
export default App;
