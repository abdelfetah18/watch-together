class Room {
    constructor(room_id, admin_id){
        this.room_id = room_id;
        this.admin_id = admin_id;
        this.clients = [];
    }

    new_connection(client){
        this.clients.push(client);
    }

    close_connection(client){
        this.clients = this.clients.filter(c => c.user.user_id != client.user.user_id);
    }

    send_to_admin(eventName, payload){
        for(let c of this.clients){
            if(c.user.user_id == this.admin_id){
                c.broadcast(eventName, payload);
            }
        }
    }

    broadcast(client, eventName, payload){
        for(let c of this.clients){
            if(c.user.user_id != client.user.user_id)
                c.broadcast(eventName, payload);
        }
    }
}

module.exports = Room;