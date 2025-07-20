import React, { useState } from 'react';
import { GitBranch, Users, FileText, Settings, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import githubColaboracion from '../assets/github_colaboracion.png';

const GitHub = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const features = [
    {
      icon: GitBranch,
      title: 'Control de Versiones',
      description: 'Rastrea cambios en tu código y datos de análisis a lo largo del tiempo.'
    },
    {
      icon: Users,
      title: 'Colaboración',
      description: 'Trabaja en equipo con otros investigadores de manera organizada y eficiente.'
    },
    {
      icon: FileText,
      title: 'Documentación',
      description: 'Mantén documentación clara de tu metodología y procesos de análisis.'
    },
    {
      icon: Settings,
      title: 'Automatización',
      description: 'Usa GitHub Actions para automatizar tareas repetitivas en tu flujo de trabajo.'
    }
  ];

  const workflows = [
    {
      title: 'Análisis de Datos Cualitativos',
      description: 'Estructura típica para proyectos de investigación cualitativa',
      structure: [
        'data/ - Datos originales y procesados',
        'scripts/ - Código de análisis',
        'results/ - Resultados y visualizaciones',
        'docs/ - Documentación del proyecto',
        'README.md - Descripción del proyecto'
      ]
    },
    {
      title: 'Colaboración en Investigación',
      description: 'Flujo de trabajo para equipos de investigación',
      structure: [
        'main branch - Versión estable del proyecto',
        'develop branch - Desarrollo activo',
        'feature branches - Nuevas funcionalidades',
        'Pull requests - Revisión de código',
        'Issues - Seguimiento de tareas'
      ]
    }
  ];

  const codeExamples = [
    {
      title: 'Configuración Inicial de Repositorio',
      language: 'bash',
      code: `# Crear nuevo repositorio
git init mi-proyecto-analisis

# Configurar información del usuario
git config user.name "Tu Nombre"
git config user.email "tu.email@universidad.edu"

# Crear estructura de carpetas
mkdir -p data/{raw,processed,external}
mkdir -p scripts/{preprocessing,analysis,visualization}
mkdir -p results/{figures,tables,reports}
mkdir -p docs

# Crear archivo README
echo "# Proyecto de Análisis Cualitativo" > README.md

# Crear .gitignore para datos sensibles
cat > .gitignore << EOF
# Datos sensibles
data/raw/*.csv
data/raw/*.xlsx
*.env

# Archivos temporales
*.tmp
*.log
.DS_Store

# Credenciales
config/credentials.json
EOF

# Primer commit
git add .
git commit -m "Configuración inicial del proyecto"

# Conectar con repositorio remoto
git remote add origin https://github.com/usuario/mi-proyecto-analisis.git
git push -u origin main`
    },
    {
      title: 'Estructura de Proyecto de Investigación',
      language: 'markdown',
      code: `# Proyecto: Análisis de Percepciones sobre Educación Virtual

## Descripción
Este proyecto analiza las percepciones de estudiantes universitarios 
sobre la educación virtual durante la pandemia COVID-19.

## Estructura del Proyecto

\`\`\`
proyecto-educacion-virtual/
├── data/
│   ├── raw/                    # Datos originales (no versionados)
│   ├── processed/              # Datos procesados
│   └── external/               # Datos de fuentes externas
├── scripts/
│   ├── preprocessing/          # Limpieza y preparación
│   ├── analysis/              # Scripts de análisis
│   └── visualization/         # Generación de gráficos
├── results/
│   ├── figures/               # Gráficos y visualizaciones
│   ├── tables/                # Tablas de resultados
│   └── reports/               # Informes generados
├── docs/
│   ├── methodology.md         # Metodología detallada
│   ├── codebook.md           # Libro de códigos
│   └── references.bib        # Referencias bibliográficas
├── requirements.txt           # Dependencias de Python
├── environment.yml           # Entorno conda
└── README.md                 # Este archivo
\`\`\`

## Metodología
- **Enfoque**: Análisis temático
- **Participantes**: 50 estudiantes universitarios
- **Herramientas**: Python, Gradio, OpenAI API
- **Período**: Enero-Marzo 2024

## Instalación
\`\`\`bash
# Clonar repositorio
git clone https://github.com/usuario/proyecto-educacion-virtual.git

# Instalar dependencias
pip install -r requirements.txt

# O usar conda
conda env create -f environment.yml
conda activate educacion-virtual
\`\`\`

## Uso
1. Colocar datos en \`data/raw/\`
2. Ejecutar preprocessing: \`python scripts/preprocessing/clean_data.py\`
3. Realizar análisis: \`python scripts/analysis/thematic_analysis.py\`
4. Generar reportes: \`python scripts/visualization/create_report.py\`

## Contribuir
1. Fork el proyecto
2. Crear rama feature (\`git checkout -b feature/nueva-funcionalidad\`)
3. Commit cambios (\`git commit -am 'Agregar nueva funcionalidad'\`)
4. Push a la rama (\`git push origin feature/nueva-funcionalidad\`)
5. Crear Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.

## Contacto
- Investigador Principal: Dr. María González (maria.gonzalez@universidad.edu)
- Asistente de Investigación: Juan Pérez (juan.perez@universidad.edu)`
    },
    {
      title: 'GitHub Actions para Análisis Automatizado',
      language: 'yaml',
      code: `# .github/workflows/analysis.yml
name: Análisis Automatizado

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    # Ejecutar análisis semanalmente
    - cron: '0 0 * * 0'

jobs:
  analysis:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Configurar Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'
    
    - name: Instalar dependencias
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Ejecutar tests
      run: |
        python -m pytest tests/
    
    - name: Análisis de calidad de código
      run: |
        flake8 scripts/
        black --check scripts/
    
    - name: Ejecutar análisis de datos
      env:
        OPENAI_API_KEY: \${{ secrets.OPENAI_API_KEY }}
      run: |
        python scripts/analysis/automated_analysis.py
    
    - name: Generar reporte
      run: |
        python scripts/visualization/generate_report.py
    
    - name: Subir artefactos
      uses: actions/upload-artifact@v3
      with:
        name: analysis-results
        path: results/
    
    - name: Notificar resultados
      if: failure()
      uses: actions/github-script@v6
      with:
        script: |
          github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: '❌ El análisis automatizado falló. Revisar logs.'
          })`
    },
    {
      title: 'Script de Análisis con Versionado',
      language: 'python',
      code: `#!/usr/bin/env python3
"""
Script de análisis cualitativo con versionado automático
Autor: Equipo de Investigación
Fecha: 2024-01-15
"""

import os
import json
import pandas as pd
import git
from datetime import datetime
from pathlib import Path

class VersionedAnalysis:
    """Clase para análisis con control de versiones automático"""
    
    def __init__(self, project_path: str):
        self.project_path = Path(project_path)
        self.repo = git.Repo(project_path)
        self.results_path = self.project_path / "results"
        self.results_path.mkdir(exist_ok=True)
    
    def get_git_info(self):
        """Obtiene información del estado actual de Git"""
        return {
            "commit_hash": self.repo.head.commit.hexsha[:8],
            "branch": self.repo.active_branch.name,
            "author": str(self.repo.head.commit.author),
            "timestamp": datetime.now().isoformat(),
            "is_dirty": self.repo.is_dirty()
        }
    
    def save_analysis_metadata(self, analysis_type: str, parameters: dict):
        """Guarda metadatos del análisis"""
        git_info = self.get_git_info()
        
        metadata = {
            "analysis_type": analysis_type,
            "parameters": parameters,
            "git_info": git_info,
            "python_version": os.sys.version,
            "working_directory": str(self.project_path)
        }
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        metadata_file = self.results_path / f"metadata_{analysis_type}_{timestamp}.json"
        
        with open(metadata_file, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)
        
        return metadata_file
    
    def run_analysis(self, data_file: str, analysis_type: str = "thematic"):
        """Ejecuta análisis con versionado automático"""
        
        # Verificar estado del repositorio
        if self.repo.is_dirty():
            print("⚠️  Advertencia: Hay cambios sin commitear")
            response = input("¿Continuar con el análisis? (y/n): ")
            if response.lower() != 'y':
                return None
        
        # Parámetros del análisis
        parameters = {
            "data_file": data_file,
            "analysis_type": analysis_type,
            "model": "gpt-4",
            "temperature": 0.3
        }
        
        # Guardar metadatos
        metadata_file = self.save_analysis_metadata(analysis_type, parameters)
        print(f"📝 Metadatos guardados en: {metadata_file}")
        
        # Ejecutar análisis (ejemplo simplificado)
        df = pd.read_csv(data_file)
        
        # Aquí iría tu lógica de análisis específica
        results = {
            "total_texts": len(df),
            "analysis_date": datetime.now().isoformat(),
            "commit_hash": self.get_git_info()["commit_hash"]
        }
        
        # Guardar resultados
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        results_file = self.results_path / f"results_{analysis_type}_{timestamp}.json"
        
        with open(results_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Análisis completado. Resultados en: {results_file}")
        
        # Auto-commit de resultados (opcional)
        if input("¿Hacer commit automático de los resultados? (y/n): ").lower() == 'y':
            self.repo.index.add([str(metadata_file), str(results_file)])
            self.repo.index.commit(f"Análisis {analysis_type} - {timestamp}")
            print("📦 Commit automático realizado")
        
        return results_file

# Ejemplo de uso
if __name__ == "__main__":
    analyzer = VersionedAnalysis(".")
    
    # Ejecutar análisis
    results = analyzer.run_analysis(
        data_file="data/processed/interviews_clean.csv",
        analysis_type="sentiment"
    )
    
    if results:
        print(f"Análisis completado: {results}")`
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            GitHub para Análisis de Datos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Utiliza GitHub para gestionar tus proyectos de análisis de datos cualitativos, 
            colaborar con otros investigadores y mantener un historial completo de tu trabajo.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16">
          <img
            src={githubColaboracion}
            alt="Colaboración en GitHub"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-xl"
          />
        </div>

        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">¿Por qué GitHub en Investigación?</h2>
            <p className="text-lg text-muted-foreground mb-6">
              GitHub no es solo para desarrolladores de software. Los investigadores pueden aprovechar 
              sus capacidades de control de versiones, colaboración y documentación para gestionar 
              proyectos de análisis de datos de manera más eficiente y transparente.
            </p>
            <p className="text-lg text-muted-foreground">
              Con GitHub, puedes mantener un registro completo de todos los cambios en tu código de análisis, 
              colaborar con colegas de manera organizada, y hacer tu investigación más reproducible y transparente.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Beneficios para Investigadores
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

        {/* Workflows */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Flujos de Trabajo Recomendados
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workflows.map((workflow, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">{workflow.title}</h3>
                <p className="text-muted-foreground mb-4">{workflow.description}</p>
                <ul className="space-y-2">
                  {workflow.structure.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Guías Prácticas
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
                  <h3 className="font-semibold text-foreground mb-2">Commits Descriptivos</h3>
                  <p className="text-muted-foreground text-sm">
                    Usa mensajes de commit claros que describan qué cambios realizaste y por qué.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Protección de Datos</h3>
                  <p className="text-muted-foreground text-sm">
                    Nunca subas datos sensibles o personales. Usa .gitignore para excluir archivos confidenciales.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Documentación Clara</h3>
                  <p className="text-muted-foreground text-sm">
                    Mantén un README detallado y documenta tu metodología y procesos de análisis.
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Ramas Organizadas</h3>
                  <p className="text-muted-foreground text-sm">
                    Usa ramas para diferentes experimentos o análisis, manteniendo main estable.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Herramientas Complementarias
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <GitBranch className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <strong className="text-foreground">GitHub Desktop:</strong>
                    <p className="text-muted-foreground text-sm">
                      Interfaz gráfica para usuarios que prefieren no usar la línea de comandos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Settings className="h-5 w-5 text-secondary mr-3 mt-1" />
                  <div>
                    <strong className="text-foreground">GitHub Actions:</strong>
                    <p className="text-muted-foreground text-sm">
                      Automatiza análisis, tests y generación de reportes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-accent mr-3 mt-1" />
                  <div>
                    <strong className="text-foreground">GitHub Pages:</strong>
                    <p className="text-muted-foreground text-sm">
                      Publica documentación y resultados como sitios web estáticos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <strong className="text-foreground">GitHub Discussions:</strong>
                    <p className="text-muted-foreground text-sm">
                      Facilita la comunicación y discusión en proyectos colaborativos.
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
            Recursos de Aprendizaje
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a
              href="https://docs.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">GitHub Docs</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Documentación oficial completa de GitHub y Git.
              </p>
            </a>
            
            <a
              href="https://lab.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">GitHub Learning Lab</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Cursos interactivos para aprender GitHub paso a paso.
              </p>
            </a>
            
            <a
              href="https://education.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-foreground">GitHub Education</h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Recursos y beneficios especiales para estudiantes e investigadores.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GitHub;

