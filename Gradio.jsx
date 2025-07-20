import React, { useState } from 'react';
import { Code, Play, Download, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import gradioInterface from '../assets/gradio_interface.png';

const Gradio = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = [
    {
      title: 'Instalación de Gradio',
      language: 'bash',
      code: `# Instalar Gradio
pip install gradio

# Para análisis de texto
pip install transformers torch

# Para análisis de datos
pip install pandas numpy matplotlib`
    },
    {
      title: 'Interfaz Básica de Análisis de Texto',
      language: 'python',
      code: `import gradio as gr
import pandas as pd
from transformers import pipeline

# Cargar modelo de análisis de sentimientos
sentiment_analyzer = pipeline("sentiment-analysis")

def analyze_text(text):
    """Analiza el sentimiento de un texto"""
    if not text:
        return "Por favor, ingresa un texto para analizar."
    
    result = sentiment_analyzer(text)
    sentiment = result[0]['label']
    confidence = result[0]['score']
    
    return f"Sentimiento: {sentiment}\\nConfianza: {confidence:.2%}"

# Crear interfaz
interface = gr.Interface(
    fn=analyze_text,
    inputs=gr.Textbox(
        label="Texto a analizar",
        placeholder="Escribe aquí el texto que quieres analizar..."
    ),
    outputs=gr.Textbox(label="Resultado del análisis"),
    title="Analizador de Sentimientos",
    description="Analiza el sentimiento de cualquier texto usando IA"
)

# Lanzar la aplicación
interface.launch()`
    },
    {
      title: 'Análisis de Múltiples Textos',
      language: 'python',
      code: `import gradio as gr
import pandas as pd
from transformers import pipeline

# Inicializar modelos
sentiment_analyzer = pipeline("sentiment-analysis")
summarizer = pipeline("summarization")

def process_multiple_texts(file):
    """Procesa múltiples textos desde un archivo CSV"""
    if file is None:
        return "Por favor, sube un archivo CSV."
    
    # Leer archivo CSV
    df = pd.read_csv(file.name)
    
    if 'texto' not in df.columns:
        return "El archivo debe tener una columna llamada 'texto'."
    
    results = []
    for text in df['texto']:
        # Análisis de sentimiento
        sentiment = sentiment_analyzer(text)[0]
        
        # Resumen (si el texto es largo)
        if len(text) > 100:
            summary = summarizer(text, max_length=50, min_length=10)[0]['summary_text']
        else:
            summary = text
        
        results.append({
            'texto_original': text[:100] + '...' if len(text) > 100 else text,
            'sentimiento': sentiment['label'],
            'confianza': f"{sentiment['score']:.2%}",
            'resumen': summary
        })
    
    # Crear DataFrame con resultados
    results_df = pd.DataFrame(results)
    
    # Guardar resultados
    output_file = "resultados_analisis.csv"
    results_df.to_csv(output_file, index=False)
    
    return results_df, output_file

# Crear interfaz
interface = gr.Interface(
    fn=process_multiple_texts,
    inputs=gr.File(
        label="Archivo CSV con textos",
        file_types=[".csv"]
    ),
    outputs=[
        gr.Dataframe(label="Resultados del análisis"),
        gr.File(label="Descargar resultados")
    ],
    title="Análisis Masivo de Textos",
    description="Sube un archivo CSV con textos para análisis automático"
)

interface.launch()`
    },
    {
      title: 'Interfaz para Codificación Cualitativa',
      language: 'python',
      code: `import gradio as gr
import pandas as pd
from transformers import pipeline
import json

# Cargar modelo para clasificación de temas
classifier = pipeline("zero-shot-classification")

def qualitative_coding(text, themes):
    """Codifica texto según temas predefinidos"""
    if not text or not themes:
        return "Por favor, proporciona texto y temas."
    
    # Convertir temas de string a lista
    theme_list = [theme.strip() for theme in themes.split(',')]
    
    # Clasificar texto según temas
    result = classifier(text, theme_list)
    
    # Formatear resultados
    coding_results = []
    for label, score in zip(result['labels'], result['scores']):
        coding_results.append({
            'tema': label,
            'relevancia': f"{score:.2%}"
        })
    
    return pd.DataFrame(coding_results)

def save_coding_session(text, themes, results):
    """Guarda la sesión de codificación"""
    session_data = {
        'texto': text,
        'temas': themes,
        'resultados': results.to_dict('records') if results is not None else []
    }
    
    with open('sesion_codificacion.json', 'w', encoding='utf-8') as f:
        json.dump(session_data, f, ensure_ascii=False, indent=2)
    
    return "sesion_codificacion.json"

# Crear interfaz con múltiples componentes
with gr.Blocks(title="Codificación Cualitativa Asistida") as interface:
    gr.Markdown("# Codificación Cualitativa con IA")
    gr.Markdown("Analiza textos cualitativos y asígnalos a temas específicos.")
    
    with gr.Row():
        with gr.Column():
            text_input = gr.Textbox(
                label="Texto a codificar",
                placeholder="Pega aquí el texto de la entrevista, grupo focal, etc.",
                lines=10
            )
            themes_input = gr.Textbox(
                label="Temas (separados por comas)",
                placeholder="educación, tecnología, trabajo, familia",
                lines=2
            )
            analyze_btn = gr.Button("Analizar", variant="primary")
        
        with gr.Column():
            results_output = gr.Dataframe(
                label="Resultados de codificación",
                headers=['tema', 'relevancia']
            )
            save_btn = gr.Button("Guardar sesión")
            file_output = gr.File(label="Descargar sesión")
    
    # Conectar funciones
    analyze_btn.click(
        qualitative_coding,
        inputs=[text_input, themes_input],
        outputs=results_output
    )
    
    save_btn.click(
        save_coding_session,
        inputs=[text_input, themes_input, results_output],
        outputs=file_output
    )

interface.launch()`
    }
  ];

  const features = [
    {
      icon: Code,
      title: 'Fácil de Usar',
      description: 'Crea interfaces web con pocas líneas de código Python, sin necesidad de conocimientos de desarrollo web.'
    },
    {
      icon: Play,
      title: 'Despliegue Rápido',
      description: 'Lanza tu aplicación localmente o compártela públicamente con un solo comando.'
    },
    {
      icon: Download,
      title: 'Múltiples Formatos',
      description: 'Soporta texto, imágenes, audio, video y archivos como entrada y salida.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Gradio: Interfaces Web para IA
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Crea interfaces web interactivas para tus modelos de análisis de datos cualitativos 
            con IA de manera rápida y sencilla.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src={gradioInterface}
            alt="Interfaz de Gradio"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">¿Qué es Gradio?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Gradio es una biblioteca de Python que permite crear interfaces web interactivas 
              para modelos de machine learning y funciones de análisis de datos de manera rápida 
              y sencilla. Es especialmente útil para investigadores que quieren compartir sus 
              herramientas de análisis sin necesidad de conocimientos avanzados de desarrollo web.
            </p>
            <p className="text-lg text-muted-foreground">
              Con Gradio, puedes crear demos interactivos de tus análisis de datos cualitativos, 
              permitir que otros investigadores utilicen tus herramientas, y facilitar la 
              colaboración en proyectos de investigación.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Ejemplos Prácticos
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
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Casos de Uso en Investigación
              </h2>
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Análisis de Sentimientos</h3>
                  <p className="text-muted-foreground text-sm">
                    Crea interfaces para que otros investigadores analicen el sentimiento 
                    de textos de entrevistas o encuestas abiertas.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Codificación Automática</h3>
                  <p className="text-muted-foreground text-sm">
                    Desarrolla herramientas para la codificación automática de datos 
                    cualitativos según categorías predefinidas.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Resumen de Textos</h3>
                  <p className="text-muted-foreground text-sm">
                    Crea interfaces para generar resúmenes automáticos de documentos 
                    largos o transcripciones de entrevistas.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Detección de Temas</h3>
                  <p className="text-muted-foreground text-sm">
                    Desarrolla herramientas para identificar temas principales 
                    en conjuntos de datos textuales.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Ventajas para Investigadores
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                  <span className="text-muted-foreground">
                    <strong>Sin conocimientos de web:</strong> No necesitas saber HTML, CSS o JavaScript
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3 mt-2"></div>
                  <span className="text-muted-foreground">
                    <strong>Colaboración fácil:</strong> Comparte tus herramientas con colegas instantáneamente
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></div>
                  <span className="text-muted-foreground">
                    <strong>Prototipado rápido:</strong> Prueba ideas y conceptos de manera ágil
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2"></div>
                  <span className="text-muted-foreground">
                    <strong>Documentación visual:</strong> Crea demos para presentaciones y papers
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Recursos Adicionales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://gradio.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Documentación Oficial</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Guías completas, tutoriales y referencia de la API de Gradio.
              </p>
            </a>
            
            <a
              href="https://huggingface.co/spaces"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Hugging Face Spaces</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Hospeda y comparte tus aplicaciones Gradio gratuitamente.
              </p>
            </a>
            
            <a
              href="https://github.com/gradio-app/gradio"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">Repositorio GitHub</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Código fuente, ejemplos y contribuciones de la comunidad.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gradio;

