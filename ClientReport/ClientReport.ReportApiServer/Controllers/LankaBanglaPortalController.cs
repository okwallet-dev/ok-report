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
	public class LankaBanglaPortalController : ControllerBase
	{
		[HttpPost]
		[Route("LankaBanglaDpsPaymentDetails")]
		public async Task<object> LankaBanglaDpsPaymentDetails(ReportModel reportModel)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.PostAsJsonAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/LankaBangla/LankaBanglaDpsPaymentDetails", reportModel))
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
