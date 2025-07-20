import React, { useState } from 'react';
import { Workflow, Zap, Database, Mail, Copy, CheckCircle, ExternalLink, Play } from 'lucide-react';
import n8nWorkflow from '../assets/n8n_workflow.png';

const FlujosN8N = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const features = [
    {
      icon: Workflow,
      title: 'Flujos Visuales',
      description: 'Crea automatizaciones complejas usando una interfaz visual intuitiva.'
    },
    {
      icon: Zap,
      title: 'Integraciones',
      description: 'Conecta con más de 400 servicios y APIs diferentes.'
    },
    {
      icon: Database,
      title: 'Procesamiento de Datos',
      description: 'Transforma y procesa datos automáticamente entre diferentes sistemas.'
    },
    {
      icon: Mail,
      title: 'Notificaciones',
      description: 'Recibe alertas y reportes automáticos por email, Slack, etc.'
    }
  ];

  const useCases = [
    {
      title: 'Análisis Automático de Encuestas',
      description: 'Procesa respuestas de Google Forms con IA y genera reportes automáticos',
      steps: [
        'Google Forms recibe nueva respuesta',
        'n8n extrae los datos de la respuesta',
        'OpenAI API analiza el sentimiento',
        'Resultados se guardan en Google Sheets',
        'Notificación por email al investigador'
      ]
    },
    {
      title: 'Monitoreo de Redes Sociales',
      description: 'Analiza menciones y comentarios en redes sociales para investigación',
      steps: [
        'Twitter API busca tweets con hashtags específicos',
        'Filtrar tweets relevantes',
        'Análisis de sentimiento con IA',
        'Almacenar en base de datos',
        'Dashboard actualizado automáticamente'
      ]
    },
    {
      title: 'Procesamiento de Entrevistas',
      description: 'Automatiza la transcripción y análisis inicial de entrevistas',
      steps: [
        'Archivo de audio subido a Dropbox',
        'Transcripción automática con Whisper API',
        'Análisis temático con GPT-4',
        'Resultados enviados a Notion',
        'Notificación al equipo de investigación'
      ]
    }
  ];

  const codeExamples = [
    {
      title: 'Instalación de n8n',
      language: 'bash',
      code: `# Instalación global con npm
npm install n8n -g

# O usando Docker
docker run -it --rm \\
  --name n8n \\
  -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  n8nio/n8n

# O usando Docker Compose
cat > docker-compose.yml << EOF
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=tu_password_seguro
    volumes:
      - ~/.n8n:/home/node/.n8n
EOF

docker-compose up -d

# Acceder a n8n en http://localhost:5678`
    },
    {
      title: 'Workflow JSON: Análisis de Encuestas',
      language: 'json',
      code: `{
  "name": "Análisis Automático de Encuestas",
  "nodes": [
    {
      "parameters": {
        "pollTimes": {
          "item": [
            {
              "mode": "everyMinute"
            }
          ]
        },
        "triggerOn": "formSubmit"
      },
      "name": "Google Forms Trigger",
      "type": "n8n-nodes-base.googleFormsTrigger",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "tu_spreadsheet_id",
        "sheetName": "Respuestas",
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "timestamp": "={{ $json.timestamp }}",
            "respuesta": "={{ $json.respuesta }}",
            "email": "={{ $json.email }}"
          }
        }
      },
      "name": "Guardar en Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [460, 300]
    },
    {
      "parameters": {
        "resource": "chat",
        "operation": "create",
        "requestBody": {
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              "role": "user",
              "content": "Analiza el sentimiento de esta respuesta de encuesta: {{ $json.respuesta }}"
            }
          ],
          "max_tokens": 150,
          "temperature": 0.3
        }
      },
      "name": "Análisis con OpenAI",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [680, 300]
    },
    {
      "parameters": {
        "operation": "append",
        "documentId": "tu_spreadsheet_id",
        "sheetName": "Análisis",
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "timestamp": "={{ $('Google Forms Trigger').item.json.timestamp }}",
            "respuesta_original": "={{ $('Google Forms Trigger').item.json.respuesta }}",
            "analisis_sentimiento": "={{ $json.choices[0].message.content }}",
            "tokens_usados": "={{ $json.usage.total_tokens }}"
          }
        }
      },
      "name": "Guardar Análisis",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 2,
      "position": [900, 300]
    },
    {
      "parameters": {
        "fromEmail": "tu_email@gmail.com",
        "toEmail": "investigador@universidad.edu",
        "subject": "Nueva respuesta analizada",
        "text": "Se ha procesado una nueva respuesta de encuesta.\\n\\nRespuesta: {{ $('Google Forms Trigger').item.json.respuesta }}\\n\\nAnálisis: {{ $('Análisis con OpenAI').item.json.choices[0].message.content }}"
      },
      "name": "Notificación Email",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 1,
      "position": [1120, 300]
    }
  ],
  "connections": {
    "Google Forms Trigger": {
      "main": [
        [
          {
            "node": "Guardar en Sheets",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Guardar en Sheets": {
      "main": [
        [
          {
            "node": "Análisis con OpenAI",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Análisis con OpenAI": {
      "main": [
        [
          {
            "node": "Guardar Análisis",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Guardar Análisis": {
      "main": [
        [
          {
            "node": "Notificación Email",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}`
    },
    {
      title: 'Workflow: Procesamiento de Archivos',
      language: 'json',
      code: `{
  "name": "Procesamiento Automático de Entrevistas",
  "nodes": [
    {
      "parameters": {
        "path": "/entrevistas",
        "watchFolder": true,
        "fileExtensions": "mp3,wav,m4a"
      },
      "name": "Monitor Carpeta",
      "type": "n8n-nodes-base.localFileTrigger",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "operation": "transcribe",
        "binaryPropertyName": "data",
        "model": "whisper-1",
        "responseFormat": "json"
      },
      "name": "Transcripción Whisper",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [460, 300]
    },
    {
      "parameters": {
        "resource": "chat",
        "operation": "create",
        "requestBody": {
          "model": "gpt-4",
          "messages": [
            {
              "role": "system",
              "content": "Eres un investigador cualitativo experto. Analiza la siguiente transcripción de entrevista e identifica los temas principales, sentimientos expresados y citas relevantes."
            },
            {
              "role": "user",
              "content": "Transcripción: {{ $json.text }}"
            }
          ],
          "max_tokens": 1000,
          "temperature": 0.3
        }
      },
      "name": "Análisis Temático",
      "type": "n8n-nodes-base.openAi",
      "typeVersion": 1,
      "position": [680, 300]
    },
    {
      "parameters": {
        "resource": "page",
        "operation": "create",
        "databaseId": "tu_notion_database_id",
        "title": "Entrevista {{ $('Monitor Carpeta').item.json.fileName }}",
        "properties": {
          "Archivo": {
            "type": "title",
            "title": [
              {
                "text": {
                  "content": "{{ $('Monitor Carpeta').item.json.fileName }}"
                }
              }
            ]
          },
          "Transcripción": {
            "type": "rich_text",
            "rich_text": [
              {
                "text": {
                  "content": "{{ $('Transcripción Whisper').item.json.text }}"
                }
              }
            ]
          },
          "Análisis": {
            "type": "rich_text",
            "rich_text": [
              {
                "text": {
                  "content": "{{ $('Análisis Temático').item.json.choices[0].message.content }}"
                }
              }
            ]
          },
          "Fecha": {
            "type": "date",
            "date": {
              "start": "{{ $now }}"
            }
          }
        }
      },
      "name": "Crear Página Notion",
      "type": "n8n-nodes-base.notion",
      "typeVersion": 2,
      "position": [900, 300]
    },
    {
      "parameters": {
        "channel": "#investigacion",
        "text": "🎙️ Nueva entrevista procesada: {{ $('Monitor Carpeta').item.json.fileName }}\\n\\n📝 Transcripción completada\\n🧠 Análisis temático realizado\\n📋 Datos guardados en Notion",
        "attachments": []
      },
      "name": "Notificación Slack",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 1,
      "position": [1120, 300]
    }
  ],
  "connections": {
    "Monitor Carpeta": {
      "main": [
        [
          {
            "node": "Transcripción Whisper",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Transcripción Whisper": {
      "main": [
        [
          {
            "node": "Análisis Temático",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Análisis Temático": {
      "main": [
        [
          {
            "node": "Crear Página Notion",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Crear Página Notion": {
      "main": [
        [
          {
            "node": "Notificación Slack",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}`
    },
    {
      title: 'Script Python para Integración',
      language: 'python',
      code: `import requests
import json
from typing import Dict, List

class N8NIntegration:
    """Clase para integrar con n8n desde Python"""
    
    def __init__(self, n8n_url: str = "http://localhost:5678", auth: tuple = None):
        self.base_url = n8n_url
        self.session = requests.Session()
        
        if auth:
            self.session.auth = auth
    
    def trigger_webhook(self, webhook_url: str, data: Dict) -> Dict:
        """Dispara un webhook de n8n"""
        
        try:
            response = self.session.post(webhook_url, json=data)
            response.raise_for_status()
            return {
                "success": True,
                "data": response.json() if response.content else None,
                "status_code": response.status_code
            }
        except requests.exceptions.RequestException as e:
            return {
                "success": False,
                "error": str(e),
                "status_code": getattr(e.response, 'status_code', None)
            }
    
    def get_workflows(self) -> List[Dict]:
        """Obtiene lista de workflows"""
        
        try:
            response = self.session.get(f"{self.base_url}/rest/workflows")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error obteniendo workflows: {e}")
            return []
    
    def execute_workflow(self, workflow_id: str, input_data: Dict = None) -> Dict:
        """Ejecuta un workflow específico"""
        
        url = f"{self.base_url}/rest/workflows/{workflow_id}/execute"
        
        payload = {
            "startNodes": [],
            "destinationNode": None
        }
        
        if input_data:
            payload["runData"] = input_data
        
        try:
            response = self.session.post(url, json=payload)
            response.raise_for_status()
            return {
                "success": True,
                "execution_id": response.json().get("data", {}).get("executionId"),
                "data": response.json()
            }
        except requests.exceptions.RequestException as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    def get_execution_status(self, execution_id: str) -> Dict:
        """Obtiene el estado de una ejecución"""
        
        try:
            response = self.session.get(f"{self.base_url}/rest/executions/{execution_id}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

class QualitativeResearchAutomation:
    """Automatización específica para investigación cualitativa"""
    
    def __init__(self, n8n_integration: N8NIntegration):
        self.n8n = n8n_integration
    
    def process_survey_response(self, response_data: Dict) -> Dict:
        """Procesa una respuesta de encuesta automáticamente"""
        
        # Webhook URL para el workflow de análisis de encuestas
        webhook_url = "http://localhost:5678/webhook/survey-analysis"
        
        # Preparar datos para n8n
        payload = {
            "timestamp": response_data.get("timestamp"),
            "participant_id": response_data.get("participant_id"),
            "responses": response_data.get("responses", {}),
            "metadata": response_data.get("metadata", {})
        }
        
        # Disparar workflow
        result = self.n8n.trigger_webhook(webhook_url, payload)
        
        if result["success"]:
            print(f"✅ Respuesta procesada exitosamente")
            return result
        else:
            print(f"❌ Error procesando respuesta: {result['error']}")
            return result
    
    def batch_process_interviews(self, interview_files: List[str]) -> List[Dict]:
        """Procesa múltiples archivos de entrevista"""
        
        results = []
        webhook_url = "http://localhost:5678/webhook/interview-processing"
        
        for file_path in interview_files:
            payload = {
                "file_path": file_path,
                "processing_options": {
                    "transcribe": True,
                    "analyze_themes": True,
                    "extract_quotes": True,
                    "sentiment_analysis": True
                }
            }
            
            result = self.n8n.trigger_webhook(webhook_url, payload)
            results.append({
                "file": file_path,
                "result": result
            })
            
            print(f"Procesado: {file_path} - {'✅' if result['success'] else '❌'}")
        
        return results
    
    def setup_monitoring_workflow(self, config: Dict) -> Dict:
        """Configura workflow de monitoreo automático"""
        
        monitoring_config = {
            "data_sources": config.get("data_sources", []),
            "analysis_frequency": config.get("frequency", "daily"),
            "notification_channels": config.get("notifications", []),
            "analysis_parameters": {
                "sentiment_analysis": True,
                "theme_extraction": True,
                "keyword_tracking": config.get("keywords", [])
            }
        }
        
        webhook_url = "http://localhost:5678/webhook/setup-monitoring"
        return self.n8n.trigger_webhook(webhook_url, monitoring_config)

# Ejemplo de uso
if __name__ == "__main__":
    # Configurar integración con n8n
    n8n_client = N8NIntegration(
        n8n_url="http://localhost:5678",
        auth=("admin", "tu_password")  # Si tienes autenticación básica
    )
    
    # Crear automatización para investigación
    automation = QualitativeResearchAutomation(n8n_client)
    
    # Ejemplo 1: Procesar respuesta de encuesta
    survey_response = {
        "timestamp": "2024-01-15T10:30:00Z",
        "participant_id": "P001",
        "responses": {
            "q1": "Me siento muy satisfecho con el curso online",
            "q2": "La interacción con el profesor fue excelente",
            "q3": "Recomendaría este formato a otros estudiantes"
        },
        "metadata": {
            "course": "Metodología de Investigación",
            "semester": "2024-1"
        }
    }
    
    result = automation.process_survey_response(survey_response)
    print(f"Resultado del procesamiento: {result}")
    
    # Ejemplo 2: Configurar monitoreo automático
    monitoring_config = {
        "data_sources": ["twitter", "google_forms", "survey_monkey"],
        "frequency": "hourly",
        "keywords": ["educación online", "aprendizaje virtual", "universidad"],
        "notifications": ["email", "slack"]
    }
    
    monitoring_result = automation.setup_monitoring_workflow(monitoring_config)
    print(f"Monitoreo configurado: {monitoring_result['success']}")`
    }
  ];

  const alternatives = [
    {
      name: 'Zapier',
      description: 'Plataforma comercial con interfaz muy amigable',
      pros: ['Fácil de usar', 'Muchas integraciones', 'Soporte comercial'],
      cons: ['Costoso para uso intensivo', 'Menos flexible']
    },
    {
      name: 'Make (Integromat)',
      description: 'Herramienta visual potente para automatización',
      pros: ['Interfaz visual excelente', 'Lógica compleja', 'Buen precio'],
      cons: ['Curva de aprendizaje', 'Menos integraciones que Zapier']
    },
    {
      name: 'Microsoft Power Automate',
      description: 'Solución de Microsoft para automatización',
      pros: ['Integración con Office 365', 'IA incorporada', 'Empresarial'],
      cons: ['Limitado fuera del ecosistema Microsoft', 'Complejo']
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Flujos de Trabajo con n8n
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Automatiza tu proceso de análisis de datos cualitativos con flujos de trabajo 
            visuales que conectan herramientas de IA, bases de datos y servicios de comunicación.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src={n8nWorkflow}
            alt="n8n Workflow Interface"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">¿Qué es n8n?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              n8n es una herramienta de automatización de flujos de trabajo de código abierto que 
              te permite conectar diferentes servicios y APIs para crear procesos automatizados. 
              En el contexto de investigación cualitativa, n8n puede automatizar tareas como el 
              procesamiento de encuestas, análisis de datos con IA, y generación de reportes.
            </p>
            <p className="text-lg text-muted-foreground">
              Con su interfaz visual de arrastrar y soltar, puedes crear flujos complejos sin 
              necesidad de programar, aunque también soporta código personalizado cuando lo necesites.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Características Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 text-center">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Casos de Uso en Investigación
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <div className="space-y-2">
                  {useCase.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-1 flex-shrink-0">
                        {stepIndex + 1}
                      </div>
                      <span className="text-muted-foreground text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Configuración y Ejemplos
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

        {/* Alternatives */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Alternativas a n8n
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternatives.map((alt, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{alt.name}</h3>
                <p className="text-muted-foreground mb-4">{alt.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-green-600 mb-2">Ventajas:</h4>
                  <ul className="space-y-1">
                    {alt.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">Desventajas:</h4>
                  <ul className="space-y-1">
                    {alt.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></div>
                        {con}
                      </li>
                    ))}
                  </ul>
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
                  <h3 className="font-semibold text-foreground mb-2">Planifica tus Flujos</h3>
                  <p className="text-muted-foreground text-sm">
                    Diseña el flujo en papel antes de implementarlo. Define claramente 
                    entradas, procesos y salidas.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Manejo de Errores</h3>
                  <p className="text-muted-foreground text-sm">
                    Implementa nodos de manejo de errores para que los fallos no 
                    detengan todo el proceso.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Monitoreo y Logs</h3>
                  <p className="text-muted-foreground text-sm">
                    Configura notificaciones y revisa regularmente los logs de 
                    ejecución para detectar problemas.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Seguridad de Datos</h3>
                  <p className="text-muted-foreground text-sm">
                    Usa variables de entorno para credenciales y considera la 
                    privacidad de los datos procesados.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Flujo de Implementación
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Play className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <strong className="text-foreground">1. Identificar Proceso</strong>
                    <p className="text-muted-foreground text-sm">
                      Define qué tareas repetitivas puedes automatizar en tu investigación.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Workflow className="h-5 w-5 text-secondary mr-3 mt-1" />
                  <div>
                    <strong className="text-foreground">2. Diseñar Flujo</strong>
                    <p className="text-muted-foreground text-sm">
                      Mapea el proceso paso a paso, identificando triggers y acciones.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Zap className="h-5 w-5 text-accent mr-3 mt-1" />
                  <div>
                    <strong className="text-foreground">3. Implementar</strong>
                    <p className="text-muted-foreground text-sm">
                      Crea el workflow en n8n, conectando los nodos necesarios.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Database className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <strong className="text-foreground">4. Probar y Optimizar</strong>
                    <p className="text-muted-foreground text-sm">
                      Ejecuta pruebas con datos reales y ajusta según sea necesario.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Recursos y Comunidad
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="https://n8n.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow text-center"
            >
              <Workflow className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">n8n Oficial</h3>
              <p className="text-muted-foreground text-xs">Sitio web oficial y documentación</p>
            </a>
            
            <a
              href="https://community.n8n.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow text-center"
            >
              <Database className="h-8 w-8 text-secondary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Comunidad</h3>
              <p className="text-muted-foreground text-xs">Foro de la comunidad n8n</p>
            </a>
            
            <a
              href="https://github.com/n8n-io/n8n"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow text-center"
            >
              <Zap className="h-8 w-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">GitHub</h3>
              <p className="text-muted-foreground text-xs">Código fuente y contribuciones</p>
            </a>
            
            <a
              href="https://docs.n8n.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow text-center"
            >
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground mb-1">Documentación</h3>
              <p className="text-muted-foreground text-xs">Guías y tutoriales detallados</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FlujosN8N;

