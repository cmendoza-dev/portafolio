'use client'
import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, Mail, Linkedin, Search, X, Code, Database, Shield, MapPin, Menu, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import projects from '@/app/data/projects';
import skills from '@/app/data/skills';
import categories from '@/app/data/categories';
import Image from 'next/image';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.reverse().slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const scrollToSection = (sectionId:string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const colors = {
    web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    mobile: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    data: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    cybersecurity: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  const getCategoryColor = (category: keyof typeof colors | string) => {
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    technologies: string[];
    demoUrl?: string;
    githubUrl?: string;
    features: string[];
    challenges?: string;
    solutions?: string;
  };
  
  const ProjectCard = ({ project }: { project: Project }) => {
    const isMobileApp = project.category === 'mobile';
    
    return (
      <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
           onClick={() => setSelectedProject(project)}>
        <div className="relative">
          <div className={`w-full ${isMobileApp ? 'h-64' : 'h-48'} overflow-hidden rounded-t-xl flex items-center justify-center ${isMobileApp ? 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800' : ''}`}>
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={isMobileApp ? 256 : 192}
              className={`${isMobileApp ? 'h-full w-auto max-w-none object-contain' : 'w-full h-full object-cover'}`}
            />
          </div>
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
              {categories.find(c => c.id === project.category)?.label}
            </span>
          </div>
          {isMobileApp && (
            <div className="absolute top-4 left-4">
              <div className="bg-purple-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                📱 Mobile
              </div>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}>{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech, index) => {
              return (
                <span key={index} className={`px-2 py-1 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-md text-sm`}>
                  {tech}
                </span>
              );
            })}
            {project.technologies.length > 3 && (
              <span className={`px-2 py-1 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-md text-sm`}>
                +{project.technologies.length - 3} más
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {project.demoUrl && (
              <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
                <ExternalLink size={14} />
                {isMobileApp ? 'App Store' : 'Demo'}
              </button>
            )}
            <button className="flex items-center gap-1 px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors text-sm">
              <Github size={14} />
              Código
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{project.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                {categories.find(c => c.id === project.category)?.label}
              </span>
            </div>
            <button onClick={onClose} className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors`}>
              <X size={24} />
            </button>
          </div>
          
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={256}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{project.description}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Tecnologías</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span key={index} className={`px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-md text-sm`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Características</h3>
              <ul className={`space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>Desafíos y Soluciones</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Desafíos</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{project.challenges}</p>
              </div>
              <div>
                <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Soluciones</h4>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{project.solutions}</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                <ExternalLink size={16} />
                Ver Demo
              </a>
            )}
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
              <Github size={16} />
              Ver Código
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-md z-40 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Carlos Mendoza
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize hover:text-blue-600 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {section === 'hero' ? 'Inicio' : section === 'about' ? 'Sobre mí' : section === 'skills' ? 'Habilidades' : section === 'projects' ? 'Proyectos' : 'Contacto'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-50 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} pt-16`}>
          <div className="flex flex-col space-y-4 px-4 py-8">
            {['hero', 'about', 'skills', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-left py-3 text-lg capitalize ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} hover:text-blue-600 transition-colors`}
              >
                {section === 'hero' ? 'Inicio' : section === 'about' ? 'Sobre mí' : section === 'skills' ? 'Habilidades' : section === 'projects' ? 'Proyectos' : 'Contacto'}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Profile Photo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-blue-600 shadow-2xl">
                  <Image
                    src="/assets/profile/profile-photo.jpg"
                    alt="Carlos Mendoza - Desarrollador Full Stack"
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
              </div>
            </div>

            {/* Name and Title */}
            <div className="mb-6">
              <h1 className={`text-3xl md:text-5xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Carlos Mendoza
              </h1>
              <h2 className={`text-2xl md:text-3xl font-semibold text-blue-600 mb-4`}>
                Desarrollador de Software
              </h2>
            </div>

            <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-3xl mx-auto`}>
              Interesado en proyectos sociales y soluciones digitales
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1+</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Años de experiencia</div>
              </div>
              <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>5+</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Proyectos completados</div>
              </div>
              <div className={`px-4 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>8+</div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Tecnologías dominadas</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
              >
                Ver Proyectos
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition-colors text-lg font-medium shadow-lg hover:shadow-xl`}
              >
                Contactar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Sobre mí
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Me apasiona crear productos de software que no solo funcionen, sino que marquen una diferencia. Siempre busco ir más allá, guiado por valores como la justicia, el esfuerzo y el compromiso con lo que hago. Disfruto trabajar con orden, enfoque y bajo retos exigentes, entregando soluciones de calidad en el tiempo previsto.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="text-white" size={32} />
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Desarrollo Web
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Aplicaciones web modernas y escalables usando tecnologías como React, Next.js y Node.js
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="text-white" size={32} />
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Análisis de Datos
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Extracción de insights valiosos mediante Python, SQL y visualizaciones interactivas
              </p>
            </div>

            
            
            {/* <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                Ciberseguridad
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Protección de sistemas y datos mediante análisis de vulnerabilidades y monitoreo
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Habilidades Técnicas
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, techs]) => (
              <div key={category} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
                <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4 capitalize`}>
                  {category === 'frontend' ? 'Frontend' : category === 'backend' ? 'Backend' : category === 'data' ? 'Data Science' : category === 'security' ? 'Ciberseguridad' : 'Herramientas'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, index) => (
                    <span key={index} className={`px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} rounded-md text-sm`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Proyectos Destacados
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Una selección de proyectos que demuestran mis habilidades en diferentes áreas tecnológicas
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-1/4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Filtrar por categoría</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : `${isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        <span>{category.label}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedCategory === category.id
                          ? 'bg-blue-500'
                          : `${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:w-3/4">
              {/* Search */}
              <div className="relative mb-6">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                <input
                  type="text"
                  placeholder="Buscar proyectos o tecnologías..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.id.toString()} project={{ ...project, id: project.id.toString() }} />
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    No se encontraron proyectos que coincidan con los filtros seleccionados.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filteredProjects.length > 0 && totalPages > 1 && (
                <div className="flex flex-col items-center space-y-4 mt-12">
                  {/* Page Info */}
                  <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} de {filteredProjects.length} proyectos
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex items-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                        currentPage === 1
                          ? `${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'}`
                          : `${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'} shadow-sm hover:shadow-md`
                      }`}
                    >
                      <ChevronLeft size={16} className="mr-1" />
                      Anterior
                    </button>

                    {/* Page Numbers */}
                    <div className="flex space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg border transition-all duration-200 ${
                            currentPage === page
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                              : `${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'} shadow-sm hover:shadow-md`
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${
                        currentPage === totalPages
                          ? `${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed' : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'}`
                          : `${isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'} shadow-sm hover:shadow-md`
                      }`}
                    >
                      Siguiente
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Contacto
            </h2>
            <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
              ¿Interesado en colaborar? Me encantaría conocer más sobre tu proyecto
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Información de contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Email</p>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>mendozasoliscarlos44@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Linkedin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LinkedIn</p>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>/in/carlos-mendoza-developer/</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Github className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GitHub</p>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>github.com/cmendoza-dev</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Ubicación</p>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>La Libertad, Perú</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-8 rounded-xl shadow-lg`}>
              <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-6`}>
                Envíame un mensaje
              </h3>
              <form className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Mensaje
                  </label>
                  <textarea
                    rows={4}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} Carlos Mendoza. Desarrollado con React, Next.js y mucho ☕
            </p>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Portfolio;