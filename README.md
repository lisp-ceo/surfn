Surfn
=====

Bored. Need to prove to myself I can still write these systems.

Client/Server application for surfing an imaginary wave with all your friends.

Components
==========

Server: - Mediates client connections.
        - Approves client sessions.
        - Notifies connected clients of their state.
        - ExpressJS/Redis

Client: - JS/HTML/CSS app.
        - Just needs to poll web sockets for changes to game state.

Development
===========

0) Write test suite
1) Write client application with test data
2) Write server application
