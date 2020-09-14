using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ClientReport.SecurityService.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OneMFS.SharedResources;

namespace ClientReport.SecurityApiServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
		private JwtModel jwtModel = null;
		public SecurityController(JwtModel _jwtModel)
		{
			jwtModel = _jwtModel;
		}
		[HttpPost]
		[Route("Login")]
		public async Task<object> Login([FromBody]LogIn model)
		{
			try
			{								
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					AuthClientUser authClientUser = null;
					//httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJva3dhbGxldCIsImp0aSI6IjdmNmJjZWRiLTk1OGYtNDExZS1hM2IzLTQ1MjllYTNmZDk1NSIsIklzQXV0aGVudGljYXRlZCI6InRydWUiLCJuYmYiOjE1OTIzNzY2MzksImV4cCI6MTU5MjM5NDYzOSwiYXVkIjoiTWZzQXVkaWVuY2UifQ.mD7FSYZkY-CN5VCUxUQE6KliRVWVr0TEbgxALJQNLbA");
					//httpClient.DefaultRequestHeaders.Add("ApiKey", "okwallet");
					using (var response = await httpClient.PostAsJsonAsync(apiInfo.Ip+apiInfo.SecurityApiServer+ "/Security/ClientLogIn",model))
					{
						authClientUser = await response.Content.ReadAsAsync<AuthClientUser>();
						authClientUser.BearerToken = CreateJwtTokenForClient(authClientUser);
						return StatusCode(StatusCodes.Status200OK, authClientUser);

					}					
				}				
			}
			catch (Exception ex)
			{				
				return StatusCode(StatusCodes.Status401Unauthorized);
			}

		}
		[HttpPost]
		[Route("ChangePassword")]
		public async Task<object> ChangePassword([FromBody]ChangePasswordModel model)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					//httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJva3dhbGxldCIsImp0aSI6IjdmNmJjZWRiLTk1OGYtNDExZS1hM2IzLTQ1MjllYTNmZDk1NSIsIklzQXV0aGVudGljYXRlZCI6InRydWUiLCJuYmYiOjE1OTIzNzY2MzksImV4cCI6MTU5MjM5NDYzOSwiYXVkIjoiTWZzQXVkaWVuY2UifQ.mD7FSYZkY-CN5VCUxUQE6KliRVWVr0TEbgxALJQNLbA");
					//httpClient.DefaultRequestHeaders.Add("ApiKey", "okwallet");
					using (var response = await httpClient.PostAsJsonAsync(apiInfo.Ip + apiInfo.SecurityApiServer + "/ApplicationUser/ChangePasswordForClient", model))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}

			}
			catch (Exception ex)
			{

				return StatusCode(StatusCodes.Status401Unauthorized); ;
			}
		}
		private string CreateJwtTokenForClient(AuthClientUser authModel)
		{
			try
			{
				JwtSettings settings = new JwtSettings();
				jwtModel = settings.Initiate();

				SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtModel.Key));

				List<Claim> jwtClaims = new List<Claim>();

				jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Sub, authModel.User.MobileNo.ToString()));
				jwtClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

				jwtClaims.Add(new Claim("IsAuthenticated", authModel.IsAuthenticated.ToString().ToLower()));

				var token = new JwtSecurityToken(jwtModel.Issuer, jwtModel.Audience, jwtClaims, DateTime.UtcNow, DateTime.UtcNow.AddMinutes(jwtModel.MinutesToExpiration), new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

				return new JwtSecurityTokenHandler().WriteToken(token);
			}

			catch (Exception ex)
			{
				return ex.ToString();
			}

		}
	}
}