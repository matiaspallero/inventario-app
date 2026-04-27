# 📊 Inventario App

Sistema de gestión de inventario y ventas diseñado para pequeños negocios, kioscos y comercios locales. Una solución SaaS moderna, intuitiva y fácil de usar que permite administrar el inventario y registrar ventas de forma eficiente.

## 🎯 Características

- **Dashboard intuitivo** con KPIs en tiempo real
- **Gestión de inventario** - Agregar, editar y eliminar productos
- **Control de stock** - Monitoreo de niveles de inventario
- **Filtros y búsqueda** - Encontrar productos rápidamente
- **Diseño responsivo** - Funciona en desktop, tablet y móvil
- **Interfaz limpia** - Pensada para usuarios sin experiencia técnica

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|-----------|-----------|
| Framework | Next.js (App Router) |
| Lenguaje | JavaScript Puro (`.js`, `.jsx`) |
| Estilos | Tailwind CSS |
| Iconos | lucide-react |
| Base de Datos | Prisma *(integración futura)* |
| Mock Data | Datos locales para desarrollo |

## 📁 Estructura del Proyecto

```
inventario-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/       # Rutas del dashboard
│   │   │   ├── layout.jsx
│   │   │   ├── page.jsx
│   │   │   └── inventario/    # Módulo de inventario
│   │   │       └── page.jsx
│   │   ├── layout.jsx         # Layout principal
│   │   └── globals.css        # Estilos globales
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── dashboard/         # Componentes del dashboard
│   │   │   └── KpisGrid.jsx
│   │   ├── inventario/        # Componentes del inventario
│   │   │   ├── InventoryFilters.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   └── ProductsTable.jsx
│   │   ├── layout/            # Componentes de layout
│   │   │   └── Sidebar.jsx
│   │   └── ui/                # Componentes UI reutilizables
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       └── KpiCard.jsx
│   │
│   ├── hooks/                 # Custom React Hooks
│   │   └── useInventory.js    # Lógica del inventario
│   │
│   └── lib/                   # Utilidades y datos
│       └── mockData.js        # Datos simulados
│
├── public/                    # Archivos estáticos
├── package.json
├── next.config.mjs
├── jsconfig.json
├── tailwind.config.js
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## 🔧 Reglas de Desarrollo

### 1. Importaciones
- **Usar siempre el alias `@/`** para importar desde la raíz de `src`
- Ejemplo: `import Button from '@/components/ui/Button'`

### 2. Diseño y Layout
- Usar correctamente `h-screen`, `w-full` y `flex-1` en contenedores principales
- **Evitar espacios grises** o áreas sin estilizar
- La UI debe verse profesional y ocupar toda la ventana

### 3. Componentización
- Si un elemento se reutiliza **más de una vez**, extraerlo a `src/components/ui/`
- Mantener la estructura modular y escalable

### 4. Interactividad
- Usar `useState` y `useMemo` para simular búsquedas y filtrados
- Interactividad local con mock data mientras se desarrolla el backend
- Los modales y formularios funcionan contra la data local

## 🚀 Cómo Empezar

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Flujo de Desarrollo

1. **Mockear la data** en `src/lib/mockData.js`
2. **Crear componentes** en `src/components/` siguiendo la estructura
3. **Implementar hooks** en `src/hooks/` para la lógica reutilizable
4. **Conectar con Prisma** cuando el backend esté listo

## 🎨 Convenciones de Código

- **JavaScript Puro** - NO se permite TypeScript (`.ts`, `.tsx`)
- **Naming**: `camelCase` para variables y funciones, `PascalCase` para componentes
- **Estilos**: Tailwind CSS como primer recurso
- **Componentes**: Functional components con hooks

## 🔮 Próximas Etapas

- [ ] Integración de Prisma con backend
- [ ] Autenticación y manejo de usuarios
- [ ] Módulo de reportes y estadísticas
- [ ] Sistema de notificaciones
- [ ] Soporte multi-tenant para múltiples negocios

## 📄 Licencia

Proyecto privado para clientes de kioscos y pequeños negocios.

---

**Última actualización:** 15 de abril de 2026