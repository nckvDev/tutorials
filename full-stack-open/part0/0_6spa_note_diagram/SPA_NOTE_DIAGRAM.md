sequenceDiagram
    participant browser
    participant server

    browser->>server: POST {content: "What is your name?", date: "2024-11-23T09:04:40.770Z"} to https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server