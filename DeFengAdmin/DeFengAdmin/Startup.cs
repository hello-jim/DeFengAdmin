using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DeFengAdmin.Startup))]
namespace DeFengAdmin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
