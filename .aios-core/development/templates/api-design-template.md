# API Design: {{service_name}}

**Service:** {{service_name}}
**Version:** {{api_version}}
**Base URL:** `{{base_url}}`
**Date:** {{date}}

---

## Overview

{{api_overview}}

---

## Authentication

**Type:** {{auth_type}} (e.g., Bearer Token, API Key, OAuth 2.0)

**Header:**
```
Authorization: Bearer {{token}}
```

**Token Expiration:** {{token_expiration}}

---

## Endpoints

### 1. {{endpoint_1_name}}

**Method:** `{{method_1}}`
**Path:** `{{path_1}}`
**Description:** {{description_1}}

**Authentication:** {{auth_required_1}}

**Request:**
```json
{{request_1_example}}
```

**Response (200):**
```json
{{response_1_example}}
```

**Error Responses:**
- `400 Bad Request`: {{error_400_1}}
- `401 Unauthorized`: {{error_401_1}}
- `404 Not Found`: {{error_404_1}}
- `500 Internal Server Error`: {{error_500_1}}

---

### 2. {{endpoint_2_name}}

**Method:** `{{method_2}}`
**Path:** `{{path_2}}`
**Description:** {{description_2}}

**Authentication:** {{auth_required_2}}

**Request:**
```json
{{request_2_example}}
```

**Response (200):**
```json
{{response_2_example}}
```

**Error Responses:**
- `400 Bad Request`: {{error_400_2}}
- `401 Unauthorized`: {{error_401_2}}
- `404 Not Found`: {{error_404_2}}
- `500 Internal Server Error`: {{error_500_2}}

---

## Error Handling

### Error Format
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {},
    "timestamp": "2026-01-27T10:00:00Z"
  }
}
```

### Status Codes
| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## Rate Limiting

**Limit:** {{rate_limit}} requests per {{rate_limit_window}}
**Header:** `X-RateLimit-Remaining`

**Example:**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1643299200
```

---

## Pagination

**Strategy:** {{pagination_strategy}} (e.g., offset-based, cursor-based)

**Query Parameters:**
- `limit`: Number of items per page (default: {{default_limit}}, max: {{max_limit}})
- `offset` / `cursor`: Pagination token

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## Filtering & Sorting

**Filtering:**
```
GET /api/{{resource}}?filter[status]=active&filter[category]=electronics
```

**Sorting:**
```
GET /api/{{resource}}?sort=-createdAt,name
```
(Use `-` prefix for descending order)

---

## Versioning

**Strategy:** {{versioning_strategy}} (URL path, header, query param)

**Example:**
```
GET /api/v1/{{resource}}
```

---

## CORS

**Allowed Origins:** {{allowed_origins}}
**Allowed Methods:** `GET, POST, PUT, PATCH, DELETE`
**Allowed Headers:** `Content-Type, Authorization`

---

## Webhooks (if applicable)

**Webhook URL:** Configured by client
**Security:** HMAC signature in `X-Webhook-Signature` header

**Payload:**
```json
{
  "event": "{{event_name}}",
  "timestamp": "2026-01-27T10:00:00Z",
  "data": {}
}
```

---

## OpenAPI Specification

Full OpenAPI/Swagger spec available at:
```
{{base_url}}/api-docs
```

---

**Prepared by:** {{architect_name}} (@architect)
**Date:** {{date}}
