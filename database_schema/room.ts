export default {
    name: "room",
    title: "room",
    type: "document",
    fields: [
        {
            name: "profile_image",
            title: "profile_image",
            type: "image"
        },
        {
            name: "name",
            title: "name",
            type: "string"
        },
        {
            name: "bio",
            title: "bio",
            type: "string"
        },
        {
            name: "categories",
            title: "categories",
            type: "array",
            of: [{ type: "reference", to: { type: "room_category" } }]
        },
        {
            name: "creator",
            title: "creator",
            type: "reference",
            to: { type: "user" }
        },

        {
            name: "admin",
            title: "admin",
            type: "reference",
            to: { type: "user" }
        },
        {
            name: "privacy",
            title: "privacy",
            type: "string",
            options: {
                list: [
                    { title: 'public', value: 'public' },
                    { title: 'private', value: 'private' }
                ]
            }
        },
        {
            name: "password",
            title: "password",
            type: "string"
        }
    ]
}