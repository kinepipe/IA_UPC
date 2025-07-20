import React, { useState } from 'react';
import { Download, Shield, Cpu, HardDrive, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import lmStudio from '../assets/lm_studio.png';

const LMStudio = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const advantages = [
    {
      icon: Shield,
      title: 'Privacidad Total',
      description: 'Tus datos nunca salen de tu computadora, garantizando máxima confidencialidad.'
    },
    {
      icon: Cpu,
      title: 'Sin Límites de Uso',
      description: 'No hay restricciones de tokens o llamadas a API, usa tanto como necesites.'
    },
    {
      icon: HardDrive,
      title: 'Funciona Offline',
      description: 'No necesitas conexión a internet una vez descargados los modelos.'
    },
    {
      icon: Download,
      title: 'Fácil Instalación',
      description: 'Interfaz gráfica intuitiva para descargar y gestionar modelos.'
    }
  ];

  const models = [
    {
      name: 'Llama 2 7B',
      size: '3.8 GB',
      description: 'Modelo versátil para análisis general de texto',
      useCase: 'Análisis de sentimientos, resúmenes básicos'
    },
    {
      name: 'Mistral 7B',
      size: '4.1 GB',
      description: 'Excelente para tareas de análisis cualitativo',
      useCase: 'Codificación temática, análisis de contenido'
    },
    {
      name: 'Code Llama 7B',
      size: '3.8 GB',
      description: 'Especializado en código y análisis técnico',
      useCase: 'Análisis de código, documentación técnica'
    },
    {
      name: 'Llama 2 13B',
      size: '7.3 GB',
      description: 'Modelo más grande con mejor comprensión',
      useCase: 'Análisis complejo, interpretación contextual'
    }
  ];

  const codeExamples = [
    {
      title: 'Configuración Inicial de LM Studio',
      language: 'python',
      code: `import requests
import json

# Configuración de LM Studio (servidor local)
LM_STUDIO_URL = "http://localhost:1234/v1"

def setup_lm_studio_client():
    """Configura cliente para LM Studio"""
    
    # Verificar que LM Studio esté ejecutándose
    try:
        response = requests.get(f"{LM_STUDIO_URL}/models")
        if response.status_code == 200:
            models = response.json()
            print("✅ LM Studio conectado exitosamente")
            print(f"Modelos disponibles: {len(models['data'])}")
            return True
        else:
            print("❌ Error conectando con LM Studio")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ LM Studio no está ejecutándose")
        print("Inicia LM Studio y carga un modelo antes de continuar")
        return False

def query_local_model(prompt, max_tokens=500, temperature=0.3):
    """Consulta modelo local en LM Studio"""
    
    headers = {
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "local-model",  # LM Studio usa este identificador
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": max_tokens,
        "temperature": temperature,
        "stream": False
    }
    
    try:
        response = requests.post(
            f"{LM_STUDIO_URL}/chat/completions",
            headers=headers,
            json=data,
            timeout=60
        )
        
        if response.status_code == 200:
            result = response.json()
            return result['choices'][0]['message']['content']
        else:
            return f"Error: {response.status_code} - {response.text}"
            
    except requests.exceptions.Timeout:
        return "Error: Timeout - El modelo tardó demasiado en responder"
    except Exception as e:
        return f"Error: {str(e)}"

# Ejemplo de uso
if __name__ == "__main__":
    if setup_lm_studio_client():
        prompt = """
        Analiza el siguiente texto de entrevista desde una perspectiva 
        de investigación cualitativa:
        
        "Me siento muy frustrada con las clases en línea. Aunque entiendo 
        que es necesario, extraño mucho la interacción cara a cara con 
        mis profesores y compañeros de clase."
        
        Identifica: 1) Sentimientos expresados, 2) Temas principales, 
        3) Aspectos positivos y negativos mencionados.
        """
        
        result = query_local_model(prompt)
        print("\\nAnálisis del modelo local:")
        print(result)`
    },
    {
      title: 'Análisis Cualitativo con Modelo Local',
      language: 'python',
      code: `import pandas as pd
import requests
import json
from typing import List, Dict
import time

class LocalQualitativeAnalyzer:
    """Analizador cualitativo usando LM Studio"""
    
    def __init__(self, base_url="http://localhost:1234/v1"):
        self.base_url = base_url
        self.session = requests.Session()
        
    def analyze_sentiment(self, text: str) -> Dict:
        """Analiza sentimiento usando modelo local"""
        
        prompt = f"""
        Analiza el sentimiento del siguiente texto. 
        Responde SOLO con un JSON en este formato:
        {{"sentimiento": "positivo/negativo/neutral", "confianza": 0.85, "emociones": ["emoción1", "emoción2"]}}
        
        Texto: {text}
        """
        
        response = self._query_model(prompt, max_tokens=150)
        
        try:
            # Extraer JSON de la respuesta
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            json_str = response[json_start:json_end]
            return json.loads(json_str)
        except:
            return {"error": "No se pudo parsear la respuesta", "raw_response": response}
    
    def extract_themes(self, text: str, num_themes: int = 5) -> List[str]:
        """Extrae temas principales del texto"""
        
        prompt = f"""
        Identifica los {num_themes} temas principales en el siguiente texto.
        Responde SOLO con una lista de temas, uno por línea, sin numeración:
        
        Texto: {text}
        """
        
        response = self._query_model(prompt, max_tokens=200)
        themes = [line.strip() for line in response.split('\\n') if line.strip()]
        return themes[:num_themes]
    
    def code_text(self, text: str, coding_scheme: List[str]) -> Dict:
        """Codifica texto según esquema predefinido"""
        
        codes_str = ", ".join(coding_scheme)
        
        prompt = f"""
        Codifica el siguiente texto usando SOLO estos códigos: {codes_str}
        
        Responde con un JSON en este formato:
        {{"códigos_aplicables": ["código1", "código2"], "justificación": "breve explicación"}}
        
        Texto: {text}
        """
        
        response = self._query_model(prompt, max_tokens=200)
        
        try:
            json_start = response.find('{')
            json_end = response.rfind('}') + 1
            json_str = response[json_start:json_end]
            return json.loads(json_str)
        except:
            return {"error": "No se pudo parsear la respuesta", "raw_response": response}
    
    def _query_model(self, prompt: str, max_tokens: int = 500, temperature: float = 0.3) -> str:
        """Método interno para consultar el modelo"""
        
        data = {
            "model": "local-model",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": max_tokens,
            "temperature": temperature,
            "stream": False
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/chat/completions",
                json=data,
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                return result['choices'][0]['message']['content']
            else:
                return f"Error HTTP: {response.status_code}"
                
        except Exception as e:
            return f"Error: {str(e)}"
    
    def batch_analyze(self, texts: List[str], analysis_type: str = "sentiment") -> List[Dict]:
        """Analiza múltiples textos en lote"""
        
        results = []
        
        for i, text in enumerate(texts):
            print(f"Procesando texto {i+1}/{len(texts)}...")
            
            if analysis_type == "sentiment":
                result = self.analyze_sentiment(text)
            elif analysis_type == "themes":
                result = {"themes": self.extract_themes(text)}
            else:
                result = {"error": "Tipo de análisis no soportado"}
            
            result["text_id"] = i
            result["original_text"] = text[:100] + "..." if len(text) > 100 else text
            results.append(result)
            
            # Pausa para no sobrecargar el modelo
            time.sleep(1)
        
        return results

# Ejemplo de uso
if __name__ == "__main__":
    analyzer = LocalQualitativeAnalyzer()
    
    # Textos de ejemplo (entrevistas)
    interview_texts = [
        "Me encanta estudiar desde casa, tengo más flexibilidad y puedo manejar mejor mi tiempo.",
        "Es muy difícil concentrarse en casa, hay muchas distracciones y extraño a mis compañeros.",
        "La tecnología a veces falla y eso me genera mucha ansiedad durante los exámenes."
    ]
    
    # Análisis de sentimientos
    sentiment_results = analyzer.batch_analyze(interview_texts, "sentiment")
    
    # Mostrar resultados
    for result in sentiment_results:
        print(f"\\nTexto {result['text_id'] + 1}: {result['original_text']}")
        if 'sentimiento' in result:
            print(f"Sentimiento: {result['sentimiento']} (Confianza: {result.get('confianza', 'N/A')})")
        else:
            print(f"Error: {result.get('error', 'Desconocido')}")`
    },
    {
      title: 'Comparación con APIs en la Nube',
      language: 'python',
      code: `import time
import requests
import openai
from typing import Dict, List

class ModelComparison:
    """Compara resultados entre modelo local y APIs en la nube"""
    
    def __init__(self, openai_key: str = None, lm_studio_url: str = "http://localhost:1234/v1"):
        self.lm_studio_url = lm_studio_url
        if openai_key:
            openai.api_key = openai_key
        self.openai_available = openai_key is not None
    
    def analyze_with_local_model(self, text: str) -> Dict:
        """Análisis con modelo local (LM Studio)"""
        
        start_time = time.time()
        
        prompt = f"""
        Analiza este texto de investigación cualitativa:
        "{text}"
        
        Proporciona:
        1. Sentimiento general
        2. Temas principales (máximo 3)
        3. Emociones identificadas
        """
        
        try:
            response = requests.post(
                f"{self.lm_studio_url}/chat/completions",
                json={
                    "model": "local-model",
                    "messages": [{"role": "user", "content": prompt}],
                    "max_tokens": 300,
                    "temperature": 0.3
                },
                timeout=60
            )
            
            end_time = time.time()
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "provider": "LM Studio (Local)",
                    "response": result['choices'][0]['message']['content'],
                    "response_time": round(end_time - start_time, 2),
                    "cost": 0.0,  # Gratis
                    "privacy": "Máxima (local)",
                    "status": "success"
                }
            else:
                return {
                    "provider": "LM Studio (Local)",
                    "status": "error",
                    "error": f"HTTP {response.status_code}"
                }
                
        except Exception as e:
            return {
                "provider": "LM Studio (Local)",
                "status": "error",
                "error": str(e)
            }
    
    def analyze_with_openai(self, text: str) -> Dict:
        """Análisis con OpenAI API"""
        
        if not self.openai_available:
            return {
                "provider": "OpenAI",
                "status": "error",
                "error": "API key no configurada"
            }
        
        start_time = time.time()
        
        prompt = f"""
        Analiza este texto de investigación cualitativa:
        "{text}"
        
        Proporciona:
        1. Sentimiento general
        2. Temas principales (máximo 3)
        3. Emociones identificadas
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=300,
                temperature=0.3
            )
            
            end_time = time.time()
            
            # Estimación de costo (aproximado para GPT-3.5-turbo)
            input_tokens = len(prompt.split()) * 1.3  # Aproximación
            output_tokens = len(response.choices[0].message.content.split()) * 1.3
            estimated_cost = (input_tokens * 0.0015 + output_tokens * 0.002) / 1000
            
            return {
                "provider": "OpenAI GPT-3.5",
                "response": response.choices[0].message.content,
                "response_time": round(end_time - start_time, 2),
                "cost": round(estimated_cost, 4),
                "privacy": "Datos enviados a OpenAI",
                "status": "success"
            }
            
        except Exception as e:
            return {
                "provider": "OpenAI GPT-3.5",
                "status": "error",
                "error": str(e)
            }
    
    def compare_models(self, text: str) -> Dict:
        """Compara ambos modelos con el mismo texto"""
        
        print("🔄 Analizando con modelo local...")
        local_result = self.analyze_with_local_model(text)
        
        print("🔄 Analizando con OpenAI...")
        openai_result = self.analyze_with_openai(text)
        
        comparison = {
            "text_analyzed": text[:100] + "..." if len(text) > 100 else text,
            "local_model": local_result,
            "cloud_model": openai_result,
            "comparison_summary": {}
        }
        
        # Generar resumen de comparación
        if local_result["status"] == "success" and openai_result["status"] == "success":
            comparison["comparison_summary"] = {
                "speed_winner": "Local" if local_result["response_time"] < openai_result["response_time"] else "Cloud",
                "cost_difference": f"Local: ${local_result['cost']}, Cloud: ${openai_result['cost']}",
                "privacy_advantage": "Local (datos no salen de tu computadora)"
            }
        
        return comparison

# Ejemplo de uso
if __name__ == "__main__":
    # Configurar comparador (reemplaza con tu API key real)
    comparator = ModelComparison(openai_key="tu-api-key-aqui")
    
    # Texto de prueba
    test_text = """
    La experiencia de aprendizaje virtual ha sido muy desafiante para mí. 
    Por un lado, aprecio la flexibilidad de poder estudiar desde casa y 
    manejar mis propios horarios. Sin embargo, extraño mucho la interacción 
    cara a cara con mis profesores y compañeros. A veces me siento aislada 
    y es difícil mantener la motivación.
    """
    
    # Realizar comparación
    results = comparator.compare_models(test_text)
    
    # Mostrar resultados
    print("\\n" + "="*50)
    print("COMPARACIÓN DE MODELOS")
    print("="*50)
    
    print(f"\\nTexto analizado: {results['text_analyzed']}")
    
    for model_type in ['local_model', 'cloud_model']:
        result = results[model_type]
        print(f"\\n--- {result['provider']} ---")
        
        if result['status'] == 'success':
            print(f"Tiempo de respuesta: {result['response_time']}s")
            print(f"Costo: ${result['cost']}")
            print(f"Privacidad: {result['privacy']}")
            print(f"Respuesta:\\n{result['response']}")
        else:
            print(f"Error: {result['error']}")
    
    if results['comparison_summary']:
        print(f"\\n--- RESUMEN ---")
        summary = results['comparison_summary']
        print(f"Más rápido: {summary['speed_winner']}")
        print(f"Costos: {summary['cost_difference']}")
        print(f"Privacidad: {summary['privacy_advantage']}")`
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            LM Studio: IA Local y Privada
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ejecuta modelos de lenguaje grandes en tu computadora local para análisis de datos 
            cualitativos con máxima privacidad y sin límites de uso.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src={lmStudio}
            alt="LM Studio Interface"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">¿Qué es LM Studio?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              LM Studio es una aplicación de escritorio que te permite descargar, instalar y ejecutar 
              modelos de lenguaje grandes (LLMs) directamente en tu computadora. Esto significa que 
              puedes aprovechar el poder de la IA para tu investigación cualitativa sin enviar tus 
              datos sensibles a servicios en la nube.
            </p>
            <p className="text-lg text-muted-foreground">
              Es especialmente valioso para investigadores que manejan datos confidenciales, tienen 
              presupuestos limitados para APIs, o necesitan trabajar sin conexión a internet.
            </p>
          </div>
        </section>

        {/* Advantages */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Ventajas para Investigadores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                <advantage.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">{advantage.title}</h3>
                <p className="text-muted-foreground text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Models */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Modelos Recomendados para Investigación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((model, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{model.name}</h3>
                  <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                    {model.size}
                  </span>
                </div>
                <p className="text-muted-foreground mb-3">{model.description}</p>
                <div className="text-sm text-foreground">
                  <strong>Ideal para:</strong> {model.useCase}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Requirements */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Requisitos del Sistema
              </h2>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Mínimo (Modelos 7B)</h3>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• RAM: 8 GB</li>
                    <li>• Almacenamiento: 10 GB libres</li>
                    <li>• CPU: Cualquier procesador moderno</li>
                    <li>• GPU: Opcional (acelera el procesamiento)</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Recomendado (Modelos 13B+)</h3>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• RAM: 16 GB o más</li>
                    <li>• Almacenamiento: 20 GB libres</li>
                    <li>• CPU: Procesador de 8+ núcleos</li>
                    <li>• GPU: NVIDIA con 8+ GB VRAM</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Pasos de Instalación
              </h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    1
                  </div>
                  <div>
                    <strong className="text-foreground">Descargar LM Studio</strong>
                    <p className="text-muted-foreground text-sm">
                      Visita lmstudio.ai y descarga la versión para tu sistema operativo.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    2
                  </div>
                  <div>
                    <strong className="text-foreground">Instalar la aplicación</strong>
                    <p className="text-muted-foreground text-sm">
                      Ejecuta el instalador y sigue las instrucciones.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    3
                  </div>
                  <div>
                    <strong className="text-foreground">Descargar modelo</strong>
                    <p className="text-muted-foreground text-sm">
                      Busca y descarga un modelo como Llama 2 7B o Mistral 7B.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    4
                  </div>
                  <div>
                    <strong className="text-foreground">Cargar y usar</strong>
                    <p className="text-muted-foreground text-sm">
                      Carga el modelo y comienza a hacer consultas o usar la API local.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Integración con Python
          </h2>
          <div className="space-y-8">
            {codeExamples.map((example, index) => (
              <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">{example.title}</h3>
                    <button
                      onClick={() => copyToClipboard(example.code, index)}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copiedCode === index ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="text-sm">
                        {copiedCode === index ? 'Copiado!' : 'Copiar'}
                      </span>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            LM Studio vs APIs en la Nube
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-card border border-border rounded-lg">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-foreground font-semibold">Aspecto</th>
                  <th className="px-6 py-3 text-left text-foreground font-semibold">LM Studio (Local)</th>
                  <th className="px-6 py-3 text-left text-foreground font-semibold">APIs en la Nube</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 font-medium text-foreground">Privacidad</td>
                  <td className="px-6 py-4 text-green-600">✅ Máxima (datos locales)</td>
                  <td className="px-6 py-4 text-yellow-600">⚠️ Datos enviados a terceros</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-foreground">Costo</td>
                  <td className="px-6 py-4 text-green-600">✅ Gratis después de la descarga</td>
                  <td className="px-6 py-4 text-red-600">❌ Pago por uso (tokens)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-foreground">Velocidad</td>
                  <td className="px-6 py-4 text-yellow-600">⚠️ Depende del hardware</td>
                  <td className="px-6 py-4 text-green-600">✅ Generalmente más rápido</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-foreground">Calidad</td>
                  <td className="px-6 py-4 text-yellow-600">⚠️ Buena (modelos más pequeños)</td>
                  <td className="px-6 py-4 text-green-600">✅ Excelente (modelos grandes)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-foreground">Conexión</td>
                  <td className="px-6 py-4 text-green-600">✅ Funciona offline</td>
                  <td className="px-6 py-4 text-red-600">❌ Requiere internet</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-foreground">Límites</td>
                  <td className="px-6 py-4 text-green-600">✅ Sin límites de uso</td>
                  <td className="px-6 py-4 text-red-600">❌ Límites de rate y tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Recursos y Enlaces
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://lmstudio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">LM Studio Oficial</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Descarga la aplicación oficial y accede a la documentación.
              </p>
            </a>
            
            <a
              href="https://huggingface.co/models"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Hugging Face Models</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Explora miles de modelos disponibles para descargar.
              </p>
            </a>
            
            <a
              href="https://ollama.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Ollama</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Alternativa de línea de comandos para ejecutar LLMs localmente.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LMStudio;

