export default {
    name:"member",
    title:"member",
    type:"document",
    fields:[
        {
            name:"user",
            title:"user",
            type:"reference",
            to:{ type:"user" }
        },
        {
            name:"permissions",
            title:"permissions",
            type:"array",
            of:[{
                type:"string",
                options: {
                    list: [
                        { title: 'control_video_player', value: 'control_video_player' },
                        { title: 'remove_members plan', value: 'remove_members' },
                        { title: 'edit_room_info', value: 'edit_room_info' },
                    ]
                }
            }]
        },
    ]
}