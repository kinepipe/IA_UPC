import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Code, Database, GitBranch, Workflow, Zap } from 'lucide-react';
import heroBanner from '../assets/hero_banner.png';
import analisisDatos from '../assets/analisis_datos_cualitativos.png';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: 'Análisis Cualitativo con IA',
      description: 'Aprende a integrar la inteligencia artificial en tu investigación cualitativa para obtener insights más profundos.',
      href: '/analisis-cualitativo',
      color: 'text-primary'
    },
    {
      icon: Code,
      title: 'Interfaces con Gradio',
      description: 'Crea interfaces web interactivas para tus modelos de IA con pocas líneas de código.',
      href: '/gradio',
      color: 'text-accent'
    },
    {
      icon: Database,
      title: 'APIs de Inteligencia Artificial',
      description: 'Integra APIs de OpenAI, Google y otros proveedores en tus proyectos de análisis.',
      href: '/apis-ia',
      color: 'text-secondary'
    },
    {
      icon: GitBranch,
      title: 'GitHub para Investigación',
      description: 'Utiliza control de versiones y colaboración para gestionar tus proyectos de análisis de datos.',
      href: '/github',
      color: 'text-primary'
    },
    {
      icon: Zap,
      title: 'LM Studio Local',
      description: 'Ejecuta modelos de lenguaje grandes en tu computadora local para máxima privacidad.',
      href: '/lm-studio',
      color: 'text-accent'
    },
    {
      icon: Workflow,
      title: 'Flujos de Trabajo n8n',
      description: 'Automatiza tu análisis de datos con flujos de trabajo visuales y integraciones.',
      href: '/flujos-n8n',
      color: 'text-secondary'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Análisis de Datos{' '}
                  <span className="text-primary">Cualitativos</span>{' '}
                  con{' '}
                  <span className="text-secondary">IA</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Descubre cómo integrar la inteligencia artificial en tu investigación cualitativa 
                  utilizando herramientas modernas como Gradio, APIs de IA, GitHub, LM Studio y n8n.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/analisis-cualitativo"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                >
                  Comenzar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/gradio"
                  className="inline-flex items-center justify-center px-8 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-accent transition-colors"
                >
                  Ver Herramientas
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroBanner}
                alt="Análisis de datos cualitativos con IA"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Herramientas y Técnicas
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explora las principales herramientas y metodologías para integrar la IA 
              en tu proceso de análisis de datos cualitativos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.href}
                className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  <h3 className="text-xl font-semibold text-foreground ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
                  <span className="text-sm font-medium">Aprender más</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Revoluciona tu Investigación
              </h2>
              <p className="text-lg text-muted-foreground">
                La inteligencia artificial está transformando la manera en que analizamos datos cualitativos. 
                Esta guía te proporciona las herramientas y conocimientos necesarios para integrar la IA 
                en tu proceso de investigación de manera ética y efectiva.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Automatización de tareas repetitivas</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Identificación de patrones complejos</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Análisis a gran escala</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Preservación de la privacidad</span>
                </li>
              </ul>
            </div>
            
            <div className="relative">
              <img
                src={analisisDatos}
                alt="Proceso de análisis de datos cualitativos"
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Explora cada sección de esta guía y descubre cómo la IA puede potenciar 
            tu investigación cualitativa.
          </p>
          <Link
            to="/analisis-cualitativo"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors"
          >
            Empezar ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

