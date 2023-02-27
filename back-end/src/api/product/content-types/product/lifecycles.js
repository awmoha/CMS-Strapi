module.exports = {
  async afterCreate(event) {
    const { result, data } = event;
    console.log(result);

    try {
      await strapi.plugins["email"].services.email.send({
        to: "mohammad.awad0110@gmail.com",
        from: "memo1daraa@outlook.com",
        subject: "You have a new post",
        text: `Your new post is: ${result.name} and here is postId ${result.id}. 
        The post created at ${result.createdAt} 
        ToolShop. Have a nice day`,
      });
    } catch (err) {
      console.log("error in mail");
    }
  },
};
//leifslounge@tylosand.se
