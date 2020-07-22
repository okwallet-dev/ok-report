using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OneMFS.SharedResources;
using OneMFS.SharedResources.Utility;

namespace ClientReport.ReportApiServer.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[Produces("application/json")]
	[ApiController]
	public class ReportController : ControllerBase
	{
		[HttpPost]
		[Route("MerchantTransactionReport")]
		public async Task<object> MerchantTransactionReport(ReportModel reportModel)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.PostAsJsonAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/Transaction/MerchantTransactionReport", reportModel))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status401Unauthorized);
			}

		}

		[HttpPost]
		[Route("MerchantTransactionSummaryReport")]
		public async Task<object> MerchantTransactionSummaryReport(ReportModel reportModel)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.PostAsJsonAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/Transaction/MerchantTransactionSummaryReport", reportModel))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status401Unauthorized);
			}

		}
		//[HttpGet]
		//public ActionResult<IEnumerable<string>> Get()
		//{
		//	return new string[] { "value1", "value2" };
		//}
	}
}