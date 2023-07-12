class Room {
    constructor(room_id, admin_id){
        this.room_id = room_id;
        this.admin_id = admin_id;
        this.clients = [];
    }

    new_connection(client){
        console.log(client.user, "Join", this.room_id);
        this.clients.push(client);
    }

    close_connection(client){
        this.clients = this.clients.filter(c => c.user.user_id != client.user.user_id);
    }

    send_to_admin(eventName, payload){
        console.log("online_users:", this.clients.length);
        console.log("send_to_admin", {eventName, payload, admin_id: this.admin_id});
        for(let c of this.clients){
            if(c.user.user_id == this.admin_id){
                console.log("Found admin is online");
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