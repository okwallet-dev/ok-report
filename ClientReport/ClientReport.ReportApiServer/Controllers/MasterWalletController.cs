using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OneMFS.SharedResources;
using OneMFS.SharedResources.Utility;

namespace ClientReport.ReportApiServer.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[Produces("application/json")]
	[ApiController]
	public class MasterWalletController : ControllerBase
	{
		[HttpPost]
		[Route("MasterWalletStatement")]
		public async Task<object> MasterWalletStatement(ReportModel reportModel)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.PostAsJsonAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/MasterWallet/GenerateAccountStatement", reportModel))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status400BadRequest, ex.ToString());
			}

		}

	}
}
