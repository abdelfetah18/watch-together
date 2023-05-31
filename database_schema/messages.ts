export default {
    name:"messages",
    title:"messages",
    type:"document",
    fields:[
        {
            name:"room",
            title:"room",
            type:"reference",
            to:{ type:"room" }
        },
        {
            name:"user",
            title:"user",
            type:"reference",
            to:{ type:"user" }
        },
        {
            name:"message",
            title:"message",
            type:"string"
        },
        {
            name:"image",
            title:"image",
            type:"image"
        },
        {
            name:"type",
            title:"type",
            type:"string",
            options: {
                list: [
                    { title: 'text', value: 'text' },
                    { title: 'image', value: 'image' },
                ]
            }
        }
    ]
}