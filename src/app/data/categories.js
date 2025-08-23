import { Code, Database, Shield, Globe, Smartphone } from 'lucide-react'; 
import projects from './projects';
 
 const categories = [
    { id: 'all', label: 'Todos los Proyectos', icon: Globe, count: projects.length },
    { id: 'web', label: 'Desarrollo Web', icon: Code, count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Apps Móviles', icon: Smartphone, count: projects.filter(p => p.category === 'mobile').length },
    { id: 'data', label: 'Análisis de Datos', icon: Database, count: projects.filter(p => p.category === 'data').length },
    { id: 'cybersecurity', label: 'Ciberseguridad', icon: Shield, count: projects.filter(p => p.category === 'cybersecurity').length }
  ];
 
  export default categories;