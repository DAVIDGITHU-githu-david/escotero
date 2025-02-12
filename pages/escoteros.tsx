import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { AlertCircle } from 'lucide-react';

const Escoteros = () => {
  const [angulo, setAngulo] = useState('');
  const [crujia, setCrujia] = useState('');
  const [barber, setBarber] = useState('');
  const [amuraEscoter, setAmuraEscoter] = useState('');
  const [initialFields, setInitialFields] = useState([]);
  const [calculationsStarted, setCalculationsStarted] = useState(false);

  // Función para validar entrada de números
  const isValidNumber = (value) => {
    return /^-?\d*,?\d*$/.test(value);
  };

  // Función para convertir coma a punto para cálculos
  const commaToPoint = (value) => {
    return value.replace(',', '.');
  };

  // Función para reiniciar todos los valores
  const resetValues = () => {
    setAngulo('');
    setCrujia('');
    setBarber('');
    setAmuraEscoter('');
    setInitialFields([]);
    setCalculationsStarted(false);
  };

  // Función para contar campos con valores
  const getFilledFieldsCount = () => {
    return [angulo, crujia, barber, amuraEscoter].filter(Boolean).length;
  };

  // Determinar si un campo está bloqueado
  const isFieldLocked = (fieldName) => {
    // Si aún no hay dos campos con valores, ningún campo está bloqueado
    if (getFilledFieldsCount() < 2) return false;
    
    // Si ya se iniciaron los cálculos, solo se pueden editar los campos iniciales
    if (calculationsStarted) {
      return !initialFields.includes(fieldName);
    }
    
    return false;
  };

  // Manejar cambios en los inputs
  const handleInputChange = (setValue, fieldName) => (e) => {
    const value = e.target.value;
    if (value === '' || isValidNumber(value)) {
      setValue(value);
      
      if (value) {
        // Si el campo no está en initialFields y hay espacio, añádelo
        if (!initialFields.includes(fieldName) && initialFields.length < 2) {
          setInitialFields(prev => [...prev, fieldName]);
        }
      } else {
        // Si se está borrando un valor, quita el campo de initialFields
        setInitialFields(prev => prev.filter(f => f !== fieldName));
        if (calculationsStarted) {
          setCalculationsStarted(false);
        }
      }
    }
  };

  // Efecto para iniciar cálculos cuando se tienen dos campos con valores
  useEffect(() => {
    const filledCount = getFilledFieldsCount();
    if (filledCount === 2 && initialFields.length === 2) {
      setCalculationsStarted(true);
    } else if (filledCount < 2) {
      setCalculationsStarted(false);
    }
  }, [angulo, crujia, barber, amuraEscoter, initialFields]);

  // Función para actualizar los cálculos
  useEffect(() => {
    if (!calculationsStarted) return;

    // Caso 1: ANGULO y CRUJIA
    if (angulo && crujia && initialFields.includes('angulo') && initialFields.includes('crujia')) {
      const anguloNum = Number(commaToPoint(angulo));
      const crujiaNum = Number(commaToPoint(crujia));
      
      const angleRad = anguloNum * Math.PI / 180;
      const calculatedBarber = crujiaNum * Math.tan(angleRad);
      const calculatedAmuraEscoter = Math.sqrt(Math.pow(crujiaNum, 2) + Math.pow(calculatedBarber, 2));
      
      setBarber(calculatedBarber.toFixed(2).replace('.', ','));
      setAmuraEscoter(calculatedAmuraEscoter.toFixed(2).replace('.', ','));
    }
    // Caso 2: CRUJIA y BARBER
    else if (crujia && barber && initialFields.includes('crujia') && initialFields.includes('barber')) {
      const crujiaNum = Number(commaToPoint(crujia));
      const barberNum = Number(commaToPoint(barber));
      
      const calculatedAngle = Math.atan(barberNum / crujiaNum) * 180 / Math.PI;
      const calculatedAmuraEscoter = Math.sqrt(Math.pow(crujiaNum, 2) + Math.pow(barberNum, 2));
      
      setAngulo(calculatedAngle.toFixed(1).replace('.', ','));
      setAmuraEscoter(calculatedAmuraEscoter.toFixed(2).replace('.', ','));
    }
    // Caso 3: AMURA-ESCOTER y BARBER
    else if (amuraEscoter && barber && initialFields.includes('amuraEscoter') && initialFields.includes('barber')) {
      const amuraEscoterNum = Number(commaToPoint(amuraEscoter));
      const barberNum = Number(commaToPoint(barber));
      
      const calculatedCrujia = Math.sqrt(Math.pow(amuraEscoterNum, 2) - Math.pow(barberNum, 2));
      const calculatedAngle = Math.atan(barberNum / calculatedCrujia) * 180 / Math.PI;
      
      setCrujia(calculatedCrujia.toFixed(2).replace('.', ','));
      setAngulo(calculatedAngle.toFixed(1).replace('.', ','));
    }
  }, [angulo, crujia, barber, amuraEscoter, calculationsStarted, initialFields]);

  // Calcular dimensiones del SVG
  const getTriangleDimensions = () => {
    const scale = 100;
    let height = Number(commaToPoint(crujia)) || 2;
    let base = Number(commaToPoint(barber)) || 1;
    
    return {
      height: height * scale,
      base: base * scale,
      angle: Number(commaToPoint(angulo)) || 0
    };
  };

  const dims = getTriangleDimensions();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">ESCOTEROS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 mb-6">
          {getFilledFieldsCount() < 2 && (
            <div className="flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">
                {getFilledFieldsCount() === 0 
                  ? "Introduce valores en dos campos para iniciar los cálculos" 
                  : "Introduce valor en un campo más para iniciar los cálculos"}
              </span>
            </div>
          )}
          
          <div>
            <Label htmlFor="angulo">ANGULO</Label>
            <Input
              id="angulo"
              value={angulo}
              onChange={handleInputChange(setAngulo, 'angulo')}
              placeholder="Ingrese ANGULO"
              readOnly={isFieldLocked('angulo')}
              className={isFieldLocked('angulo') ? 'bg-gray-50' : ''}
            />
          </div>
          <div>
            <Label htmlFor="crujia">CRUJIA</Label>
            <Input
              id="crujia"
              value={crujia}
              onChange={handleInputChange(setCrujia, 'crujia')}
              placeholder="Ingrese CRUJIA"
              readOnly={isFieldLocked('crujia')}
              className={isFieldLocked('crujia') ? 'bg-gray-50' : ''}
            />
          </div>
          <div>
            <Label htmlFor="barber">BARBER</Label>
            <Input
              id="barber"
              value={barber}
              onChange={handleInputChange(setBarber, 'barber')}
              placeholder="Ingrese BARBER"
              readOnly={isFieldLocked('barber')}
              className={isFieldLocked('barber') ? 'bg-gray-50' : ''}
            />
          </div>
          <div>
            <Label htmlFor="amura">AMURA-ESCOTER</Label>
            <Input
              id="amura"
              value={amuraEscoter}
              onChange={handleInputChange(setAmuraEscoter, 'amuraEscoter')}
              placeholder="Ingrese AMURA-ESCOTER"
              readOnly={isFieldLocked('amuraEscoter')}
              className={isFieldLocked('amuraEscoter') ? 'bg-gray-50' : ''}
            />
          </div>
          <Button 
            onClick={resetValues}
            className="mt-4 w-full bg-red-500 hover:bg-red-600"
          >
            Borrar Valores
          </Button>
        </div>

        <div className="w-full flex justify-center mb-4">
          <svg 
            viewBox={`0 0 ${dims.base + 50} ${dims.height + 50}`} 
            width="400" 
            height="300"
          >
            {/* Triángulo */}
            <path
              d={`M 25 ${dims.height + 25} L ${dims.base + 25} ${dims.height + 25} L 25 25 Z`}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            
            {/* Ángulo recto */}
            <path
              d={`M ${25 + 20} ${dims.height + 25 - 20} L ${25 + 20} ${dims.height + 25} L ${25} ${dims.height + 25 - 20}`}
              fill="none"
              stroke="black"
              strokeWidth="2"
            />

            {/* Ángulo entre CRUJIA y AMURA-ESCOTER */}
            {angulo && (
              <path
                d={`M 25 ${dims.height + 25 - 30} A 30 30 0 0 0 ${25 + 30 * Math.sin(Number(commaToPoint(angulo)) * Math.PI / 180)} ${dims.height + 25 - 30 * Math.cos(Number(commaToPoint(angulo)) * Math.PI / 180)}`}
                fill="none"
                stroke="black"
                strokeWidth="1"
              />
            )}

            {/* Etiquetas */}
            <text 
              x={dims.base/2 + 25} 
              y={dims.height + 45} 
              textAnchor="middle"
              dominantBaseline="middle"
            >
              BARBER
            </text>
            
            <text 
              x="10" 
              y={dims.height/2 + 25} 
              textAnchor="middle" 
              dominantBaseline="middle"
              transform={`rotate(-90, 10, ${dims.height/2 + 25})`}
            >
              CRUJIA
            </text>
            
            <text>
              <textPath 
                href="#hipotenusa" 
                startOffset="50%" 
                textAnchor="middle"
              >
                AMURA-ESCOTER
              </textPath>
            </text>
            
            <path
              id="hipotenusa"
              d={`M 25 25 L ${dims.base + 25} ${dims.height + 25}`}
              fill="none"
              stroke="none"
            />
            
            {/* Valor del ángulo en la parte superior */}
            {angulo && (
              <text 
                x="25" 
                y="15" 
                textAnchor="start"
              >
                {angulo}°
              </text>
            )}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default Escoteros;
