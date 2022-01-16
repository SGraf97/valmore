# valmore assignment
A simple `SPA` calendar web app using vuejs


```js
{
    event_name: {type: String }
    event_description: { type: String }
    event_date: { type: Date }
    created_by: { type: String }
    created_at: Date
    updated_at: Date
    deleted_at: Date
}
```
**For api calls I'm using axios**

List of events: `POST` /api/1.0.0/test/events/{PSK}/list

Get an event: `GET` /api/1.0.0/test/events/{PSK}/{ID}

Create new event: `POST` /api/1.0.0/test/events/{PSK}/new

Update an event: `PUT` /api/1.0.0/test/events/{PSK}/{ID}

Delete an event: `DELETE` /api/1.0.0/test/events/{PSK}/{ID}


## Project setup
```
npm install
```
You can fill you personal secret key in src/config.js 


## Compiles and hot-reloads for development
```
npm run serve
```

