# Audit Log Dashboard

A full-stack MERN app to upload, search, filter, sort, and paginate audit logs from CSV/Excel files.

## Live Link
 
-Audit Log System [Link](TODO)


## Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS + Axios
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **File parsing:** xlsx (handles both CSV and Excel)
- **Upload:** Multer

## Setup

### Backend
```bash
cd backend
cp .env.example .env   # set MONGO_URI
npm install
npm run dev
```
Runs on `http://localhost:5000`.

### Frontend
```bash
cd frontend
cp .env.example .env   # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```
Runs on `http://localhost:5173`.

### Upload file format
Required columns: `actor, role, action, resource, resourceType, ipAddress, region, severity, status, timestamp`
- `role`: admin / manager / support / user
- `severity`: LOW / MEDIUM / HIGH / CRITICAL
- `status`: Resolved / Unresolved

## Key Technical Decisions
- **Controller → Service → Model split:** keeps business logic (queries, parsing, validation) out of controllers and easier to test.
- **`insertMany({ ordered: false })`:** one bad row in an upload shouldn't block the rest — inserts continue past failures, and the real inserted count is recovered from the bulk-write error.
- **Row-level validation before insert:** invalid rows (bad enum, unparseable date) are caught and reported with reasons, rather than surfacing a generic DB error.
- **Debounced search (400ms):** avoids firing an API call on every keystroke.
- **Page resets on filter/search change:** prevents a stale page number from showing a false "No Logs Found."


## API
| Method | Route | Description |
|---|---|---|
| POST | `/api/logs/upload` | Upload CSV/XLSX file |
| GET | `/api/logs` | List logs (search, filter, sort, pagination) |

