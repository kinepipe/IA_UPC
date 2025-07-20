import React, { useState } from 'react';
import { Key, Cloud, Shield, Code, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import apisIA from '../assets/apis_ia.png';

const APIsIA = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const apis = [
    {
      name: 'OpenAI API',
      description: 'GPT-4, GPT-3.5, y otros modelos de lenguaje avanzados',
      features: ['Análisis de texto', 'Generación de contenido', 'Resúmenes', 'Traducción'],
      pricing: 'Pago por uso',
      website: 'https://openai.com/api'
    },
    {
      name: 'Google AI APIs',
      description: 'Vertex AI, Natural Language AI, y Translation API',
      features: ['Análisis de sentimientos', 'Extracción de entidades', 'Clasificación', 'Traducción'],
      pricing: 'Freemium + Pago por uso',
      website: 'https://cloud.google.com/ai'
    },
    {
      name: 'Anthropic Claude',
      description: 'Modelo de IA conversacional con enfoque en seguridad',
      features: ['Análisis profundo', 'Razonamiento', 'Escritura', 'Código'],
      pricing: 'Pago por uso',
      website: 'https://www.anthropic.com'
    },
    {
      name: 'Hugging Face',
      description: 'Acceso a miles de modelos de IA open source',
      features: ['Modelos especializados', 'Fine-tuning', 'Datasets', 'Spaces'],
      pricing: 'Freemium',
      website: 'https://huggingface.co'
    }
  ];

  const codeExamples = [
    {
      title: 'Configuración de OpenAI API',
      language: 'python',
      code: `import openai
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def analyze_qualitative_data(text, research_question):
    """Analiza datos cualitativos usando GPT-4"""
    
    prompt = f"""
    Como investigador experto en análisis cualitativo, analiza el siguiente texto 
    en relación a la pregunta de investigación: "{research_question}"
    
    Texto a analizar:
    {text}
    
    Por favor proporciona:
    1. Temas principales identificados
    2. Patrones emergentes
    3. Citas relevantes
    4. Interpretación contextual
    5. Recomendaciones para análisis adicional
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Eres un investigador cualitativo experto."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=1500,
        temperature=0.3
    )
    
    return response.choices[0].message.content

# Ejemplo de uso
research_question = "¿Cómo perciben los estudiantes el aprendizaje en línea?"
interview_text = """
Participante: Creo que el aprendizaje en línea tiene sus ventajas, 
como la flexibilidad de horarios, pero extraño mucho la interacción 
cara a cara con mis compañeros y profesores...
"""

analysis = analyze_qualitative_data(interview_text, research_question)
print(analysis)`
    },
    {
      title: 'Google Cloud Natural Language API',
      language: 'python',
      code: `from google.cloud import language_v1
import os

# Configurar credenciales
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'path/to/credentials.json'

def analyze_sentiment_entities(text):
    """Analiza sentimientos y entidades usando Google Cloud"""
    
    client = language_v1.LanguageServiceClient()
    
    # Configurar documento
    document = language_v1.Document(
        content=text,
        type_=language_v1.Document.Type.PLAIN_TEXT,
        language="es"
    )
    
    # Análisis de sentimientos
    sentiment_response = client.analyze_sentiment(
        request={"document": document}
    )
    
    # Análisis de entidades
    entities_response = client.analyze_entities(
        request={"document": document}
    )
    
    # Procesar resultados
    results = {
        "sentiment": {
            "score": sentiment_response.document_sentiment.score,
            "magnitude": sentiment_response.document_sentiment.magnitude
        },
        "entities": []
    }
    
    for entity in entities_response.entities:
        results["entities"].append({
            "name": entity.name,
            "type": entity.type_.name,
            "salience": entity.salience
        })
    
    return results

# Ejemplo de uso
text = """
La experiencia de aprendizaje virtual ha sido desafiante pero 
enriquecedora. Los estudiantes de la Universidad Nacional han 
mostrado gran adaptabilidad durante la pandemia.
"""

analysis = analyze_sentiment_entities(text)
print(f"Sentimiento: {analysis['sentiment']['score']:.2f}")
print(f"Entidades encontradas: {len(analysis['entities'])}")`
    },
    {
      title: 'Análisis Masivo con Hugging Face',
      language: 'python',
      code: `from transformers import pipeline
import pandas as pd
from tqdm import tqdm

# Inicializar pipelines
sentiment_analyzer = pipeline(
    "sentiment-analysis",
    model="nlptown/bert-base-multilingual-uncased-sentiment"
)

topic_classifier = pipeline(
    "zero-shot-classification",
    model="facebook/bart-large-mnli"
)

def process_interview_data(csv_file, topics):
    """Procesa datos de entrevistas masivamente"""
    
    # Cargar datos
    df = pd.read_csv(csv_file)
    
    results = []
    
    for index, row in tqdm(df.iterrows(), total=len(df)):
        text = row['transcript']
        participant_id = row['participant_id']
        
        # Análisis de sentimiento
        sentiment = sentiment_analyzer(text)[0]
        
        # Clasificación de temas
        topic_result = topic_classifier(text, topics)
        main_topic = topic_result['labels'][0]
        topic_score = topic_result['scores'][0]
        
        results.append({
            'participant_id': participant_id,
            'sentiment_label': sentiment['label'],
            'sentiment_score': sentiment['score'],
            'main_topic': main_topic,
            'topic_confidence': topic_score,
            'text_length': len(text),
            'original_text': text[:200] + '...' if len(text) > 200 else text
        })
    
    # Crear DataFrame con resultados
    results_df = pd.DataFrame(results)
    
    # Guardar resultados
    results_df.to_csv('analysis_results.csv', index=False)
    
    return results_df

# Definir temas de investigación
research_topics = [
    "experiencia educativa",
    "tecnología y herramientas",
    "interacción social",
    "desafíos y dificultades",
    "beneficios y ventajas"
]

# Procesar datos
# results = process_interview_data('interviews.csv', research_topics)
# print(f"Procesadas {len(results)} entrevistas")`
    },
    {
      title: 'Integración con Múltiples APIs',
      language: 'python',
      code: `import openai
import requests
import json
from typing import Dict, List

class QualitativeAnalysisAPI:
    """Clase para integrar múltiples APIs de IA en análisis cualitativo"""
    
    def __init__(self, openai_key: str, anthropic_key: str = None):
        self.openai_key = openai_key
        self.anthropic_key = anthropic_key
        openai.api_key = openai_key
    
    def openai_analysis(self, text: str, analysis_type: str) -> Dict:
        """Análisis usando OpenAI"""
        
        prompts = {
            "themes": "Identifica los temas principales en este texto:",
            "sentiment": "Analiza el sentimiento y emociones en este texto:",
            "summary": "Proporciona un resumen conciso de este texto:",
            "coding": "Codifica este texto según metodología de teoría fundamentada:"
        }
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": f"{prompts[analysis_type]} {text}"}
            ],
            max_tokens=800,
            temperature=0.3
        )
        
        return {
            "provider": "OpenAI",
            "analysis_type": analysis_type,
            "result": response.choices[0].message.content
        }
    
    def anthropic_analysis(self, text: str, analysis_type: str) -> Dict:
        """Análisis usando Anthropic Claude"""
        
        if not self.anthropic_key:
            return {"error": "Anthropic API key not provided"}
        
        headers = {
            "x-api-key": self.anthropic_key,
            "content-type": "application/json"
        }
        
        prompt = f"Analiza este texto desde una perspectiva de investigación cualitativa: {text}"
        
        data = {
            "prompt": f"\\n\\nHuman: {prompt}\\n\\nAssistant:",
            "model": "claude-2",
            "max_tokens_to_sample": 800,
            "temperature": 0.3
        }
        
        response = requests.post(
            "https://api.anthropic.com/v1/complete",
            headers=headers,
            json=data
        )
        
        if response.status_code == 200:
            return {
                "provider": "Anthropic",
                "analysis_type": analysis_type,
                "result": response.json()["completion"]
            }
        else:
            return {"error": f"API error: {response.status_code}"}
    
    def comparative_analysis(self, text: str, analysis_type: str) -> Dict:
        """Compara resultados de múltiples APIs"""
        
        openai_result = self.openai_analysis(text, analysis_type)
        anthropic_result = self.anthropic_analysis(text, analysis_type)
        
        return {
            "text_analyzed": text[:100] + "...",
            "analysis_type": analysis_type,
            "openai_analysis": openai_result,
            "anthropic_analysis": anthropic_result,
            "comparison_notes": "Revisar consistencia entre análisis"
        }

# Ejemplo de uso
analyzer = QualitativeAnalysisAPI(
    openai_key="your-openai-key",
    anthropic_key="your-anthropic-key"
)

interview_excerpt = """
Me siento muy frustrada con las clases virtuales. 
Aunque entiendo que es necesario, extraño mucho 
la interacción directa con mis profesores y compañeros.
"""

# Análisis comparativo
comparison = analyzer.comparative_analysis(interview_excerpt, "sentiment")
print(json.dumps(comparison, indent=2, ensure_ascii=False))`
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            APIs de Inteligencia Artificial
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integra servicios de IA en la nube para potenciar tu análisis de datos cualitativos 
            con modelos de lenguaje avanzados y herramientas especializadas.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src={apisIA}
            alt="APIs de Inteligencia Artificial"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">¿Por qué usar APIs de IA?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Las APIs de inteligencia artificial te permiten acceder a modelos de lenguaje 
              avanzados y herramientas especializadas sin necesidad de entrenar tus propios 
              modelos. Esto es especialmente valioso para investigadores que necesitan 
              capacidades de análisis sofisticadas pero no tienen los recursos computacionales 
              para ejecutar modelos grandes localmente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Cloud className="h-6 w-6 text-primary" />
                <span className="text-muted-foreground">Acceso a modelos de última generación</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-secondary" />
                <span className="text-muted-foreground">Infraestructura segura y escalable</span>
              </div>
              <div className="flex items-center space-x-3">
                <Key className="h-6 w-6 text-accent" />
                <span className="text-muted-foreground">Fácil integración con API keys</span>
              </div>
            </div>
          </div>
        </section>

        {/* APIs Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Principales Proveedores de APIs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apis.map((api, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">{api.name}</h3>
                  <a
                    href={api.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-muted-foreground mb-4">{api.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Características:</h4>
                  <div className="flex flex-wrap gap-2">
                    {api.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Precio:</strong> {api.pricing}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Ejemplos de Integración
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

        {/* Best Practices */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Mejores Prácticas
              </h2>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Seguridad de API Keys</h3>
                  <p className="text-muted-foreground text-sm">
                    Nunca hardcodees las API keys en tu código. Usa variables de entorno 
                    y archivos .env para mantener tus credenciales seguras.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Manejo de Errores</h3>
                  <p className="text-muted-foreground text-sm">
                    Implementa manejo robusto de errores para casos como límites de rate, 
                    fallos de red y respuestas inesperadas de la API.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Optimización de Costos</h3>
                  <p className="text-muted-foreground text-sm">
                    Monitorea tu uso de tokens y optimiza tus prompts para reducir costos. 
                    Considera usar modelos más pequeños para tareas simples.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Validación de Resultados</h3>
                  <p className="text-muted-foreground text-sm">
                    Siempre valida los resultados de la IA con revisión humana, 
                    especialmente en investigación académica.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Consideraciones Éticas
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong className="text-foreground">Transparencia:</strong>
                    <p className="text-muted-foreground text-sm">
                      Documenta qué APIs y modelos utilizas en tu investigación.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong className="text-foreground">Privacidad:</strong>
                    <p className="text-muted-foreground text-sm">
                      Asegúrate de que los datos sensibles cumplan con regulaciones de privacidad.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong className="text-foreground">Sesgos:</strong>
                    <p className="text-muted-foreground text-sm">
                      Reconoce y mitiga posibles sesgos en los modelos de IA utilizados.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                  <div>
                    <strong className="text-foreground">Reproducibilidad:</strong>
                    <p className="text-muted-foreground text-sm">
                      Documenta versiones de modelos y parámetros para reproducibilidad.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Recursos y Documentación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://platform.openai.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow text-center"
            >
              <Code className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">OpenAI Docs</h3>
              <p className="text-muted-foreground text-xs">Documentación oficial de OpenAI API</p>
            </a>
            
            <a
              href="https://cloud.google.com/natural-language/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow text-center"
            >
              <Cloud className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Google AI</h3>
              <p className="text-muted-foreground text-xs">APIs de Google Cloud AI</p>
            </a>
            
            <a
              href="https://docs.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow text-center"
            >
              <Shield className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Anthropic</h3>
              <p className="text-muted-foreground text-xs">Documentación de Claude API</p>
            </a>
            
            <a
              href="https://huggingface.co/docs/api-inference"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow text-center"
            >
              <Key className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Hugging Face</h3>
              <p className="text-muted-foreground text-xs">API de modelos open source</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default APIsIA;

