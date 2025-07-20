import React from 'react';
import { Brain, Search, FileText, Shield, TrendingUp, Users } from 'lucide-react';
import analisisDatos from '../assets/analisis_datos_cualitativos.png';

const AnalisisCualitativo = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Eficiencia Mejorada',
      description: 'Automatiza tareas repetitivas como la codificación inicial y la categorización de datos.'
    },
    {
      icon: Search,
      title: 'Detección de Patrones',
      description: 'Identifica patrones y temas emergentes que podrían pasar desapercibidos en el análisis manual.'
    },
    {
      icon: Users,
      title: 'Escalabilidad',
      description: 'Procesa grandes volúmenes de datos cualitativos de manera consistente y sistemática.'
    },
    {
      icon: Shield,
      title: 'Reducción de Sesgos',
      description: 'Minimiza los sesgos cognitivos del investigador mediante análisis objetivos y reproducibles.'
    }
  ];

  const applications = [
    'Análisis de entrevistas en profundidad',
    'Procesamiento de grupos focales',
    'Análisis de contenido de redes sociales',
    'Revisión de literatura académica',
    'Análisis de feedback de usuarios',
    'Investigación etnográfica digital'
  ];

  const considerations = [
    {
      title: 'Transparencia',
      description: 'Documenta claramente qué herramientas de IA utilizas y cómo influyen en tus resultados.'
    },
    {
      title: 'Validación Humana',
      description: 'La IA debe complementar, no reemplazar, el juicio crítico del investigador.'
    },
    {
      title: 'Privacidad de Datos',
      description: 'Asegúrate de que los datos sensibles se manejen de acuerdo con las regulaciones de privacidad.'
    },
    {
      title: 'Interpretación Contextual',
      description: 'Los modelos de IA pueden perder matices culturales y contextuales importantes.'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Análisis de Datos Cualitativos con IA
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre cómo la inteligencia artificial puede transformar tu proceso de investigación 
            cualitativa, manteniendo la rigurosidad académica y la ética en la investigación.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src={analisisDatos}
            alt="Análisis de datos cualitativos con IA"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <div className="flex items-center mb-6">
              <Brain className="h-8 w-8 text-primary mr-3" />
              <h2 className="text-3xl font-bold text-foreground">¿Qué es el Análisis Cualitativo con IA?</h2>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              El análisis de datos cualitativos asistido por inteligencia artificial combina las fortalezas 
              de la interpretación humana con la capacidad de procesamiento y detección de patrones de las 
              máquinas. Esta aproximación permite a los investigadores procesar grandes volúmenes de datos 
              textuales, identificar temas emergentes y generar insights más profundos de manera más eficiente.
            </p>
            <p className="text-lg text-muted-foreground">
              La IA no reemplaza al investigador, sino que actúa como una herramienta poderosa que amplifica 
              las capacidades analíticas humanas, permitiendo un análisis más sistemático, reproducible y 
              escalable de los datos cualitativos.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Beneficios de la IA en Investigación Cualitativa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                </div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Aplicaciones Prácticas
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                La IA puede aplicarse en diversos contextos de investigación cualitativa, 
                desde el análisis de entrevistas hasta el procesamiento de contenido digital.
              </p>
              <ul className="space-y-3">
                {applications.map((application, index) => (
                  <li key={index} className="flex items-center">
                    <FileText className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{application}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Proceso Típico
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Preparación de Datos</h4>
                    <p className="text-muted-foreground text-sm">Limpieza y estructuración de los datos textuales</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Análisis Automatizado</h4>
                    <p className="text-muted-foreground text-sm">Aplicación de modelos de IA para codificación inicial</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Revisión Humana</h4>
                    <p className="text-muted-foreground text-sm">Validación y refinamiento de los resultados</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Interpretación</h4>
                    <p className="text-muted-foreground text-sm">Análisis contextual y generación de insights</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ethical Considerations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Consideraciones Éticas y Metodológicas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {considerations.map((consideration, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {consideration.title}
                </h3>
                <p className="text-muted-foreground">{consideration.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tools Preview */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Herramientas Recomendadas
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-8">
            Explora las herramientas específicas que te ayudarán a implementar IA en tu investigación cualitativa.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Gradio</h3>
              <p className="text-muted-foreground text-sm">Interfaces web interactivas</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">APIs de IA</h3>
              <p className="text-muted-foreground text-sm">Integración con servicios de IA</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">n8n</h3>
              <p className="text-muted-foreground text-sm">Automatización de flujos</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AnalisisCualitativo;

