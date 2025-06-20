# 🧭 NITC Way-Finder — Intelligent Campus Navigation and Geo-Management Platform

A scalable, full-stack geospatial information system (GIS) designed for **National Institute of Technology Calicut (NITC)**. The system addresses the longstanding logistical challenges faced by students, faculty, administrative staff, and visitors in navigating complex campus layouts and accessing localized spatial data. The platform supports authenticated interactions, real-time campus mapping, and a moderated custom marker framework built atop the **Google Maps API** and RESTful microservices.

---

## 📌 Problem Statement

Navigating institutional environments such as a large university campus involves **spatial disorientation, inefficient wayfinding, and lack of contextual awareness**, especially for first-year students, guests, and event attendees. Static maps and printed guides are insufficient, while general-purpose mapping tools fail to reflect campus-specific infrastructure and semantics.

The **NITC Way-Finder** project is a robust solution designed to overcome these limitations through:
- Real-time interactive mapping of all academic and residential zones.
- Intelligent route visualization between fine-grained campus locations.
- Custom user annotations for temporary or non-registered landmarks.
- Administrative moderation for geo-data integrity and semantic accuracy.

---

## 🔍 Key Functional Objectives

- Provide an **interactive geospatial interface** tailored to the NITC campus ecosystem.
- Allow dynamic routing between internal buildings and zones using institutional context.
- Enable users to **annotate the physical space** with markers relevant to campus life (events, food stalls, workshops).
- Equip campus administrators with tools to **manage and govern map data** securely.

---

## 💡 Core Features

### 🔐 Secure Authentication & Role Segregation
- **JWT-based Authentication**: Ensures stateless, secure access control.
- **User and Admin Roles**: Privileged APIs and UI components based on user role.
- **Session Management**: Protects against token reuse and unauthorized access.

### 🗺️ Geospatial Interface
- **Google Maps API Integration**: High-performance rendering of geospatial data.
- **Semantic Route Mapping**: Define and retrieve custom pathways between academic blocks, hostels, and shared utilities.
- **Location Search & Discovery**: Autocomplete search for rapid spatial lookup.

### 📍 Intelligent Marker Management
- **User-Driven Marker Suggestions**: Location-tagged metadata for informal or temporary POIs (e.g., canteens, event tents, lost & found).
- **Moderated Approval Pipeline**: Admins validate submissions to preserve data quality and prevent map pollution.
- **Editable Metadata**: Admins can refine marker descriptions and iconography post-submission.

---

## 🧠 Technical Architecture

        +----------------------------+
        |       Angular Frontend     |
        |  (Google Maps Rendering)   |
        +----------------------------+
                     ↓ REST API
        +----------------------------+
        |   Node.js + Express Server |
        |  Auth, Marker CRUD, Routing|
        +----------------------------+
                     ↓ Mongoose ODM
        +----------------------------+
        |         MongoDB Atlas       |
        |   Users, Markers, Routes    |
        +----------------------------+
                     ↓
        +----------------------------+
        |     Google Maps API        |
        |     Spatial Intelligence   |
        +----------------------------+

- **Frontend**: Responsive Angular SPA with lazy loading for route modules and Google Maps components.
- **Backend**: Modular Express services with custom middleware for role-based routing and token validation.
- **Data Model**: Highly normalized marker schemas with geospatial indexing for efficient querying and extensibility.

---

## 🔄 Application Workflow

1. **User Registration** → Sign up via secure form.
2. **Login** → Session created with JWT.
3. **Map Interface** → View campus, routes, and POIs.
4. **Marker Submission** → Submit a new location (e.g., shortcut, event zone).
5. **Admin Panel** → Admins approve and manage markers.

---

## 🧪 Challenges & Solutions

| Challenge | Solution |
|----------|----------|
| Ensuring secure login sessions | Implemented JWT with proper token handling and expiry |
| Handling unverified user inputs | Introduced admin-based moderation layer for all map changes |
| Mobile map compatibility | Designed a fully responsive UI and optimized map rendering |

---

## 🌟 Future Enhancements

- 🧭 **Route Optimization**: Suggest shortest/time-efficient paths dynamically.
- 🔔 **Real-time Announcements**: Embed live campus event and alert feed on map.
- ⭐ **Landmark Ratings**: Let users rate or tag locations with comments for better discovery.
- 🧬 **Indoor Navigation**: Expand to support floor-wise navigation for large buildings.

---

## 📌 Use Cases

- Orientation for first-year students
- Navigation aid during campus events (fests, conferences)
- Visitors locating departments, hostels, or guest houses
- Emergency services identifying access routes

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> Designed to improve spatial awareness, save time, and make the NITC campus more accessible — one marker at a time.

