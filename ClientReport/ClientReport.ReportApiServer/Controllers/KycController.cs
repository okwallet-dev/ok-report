using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OneMFS.SharedResources;

namespace ClientReport.ReportApiServer.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[Produces("application/json")]
	[ApiController]	
    public class KycController : ControllerBase
    {
		[HttpGet]
		[Route("GetMerchantKycInfoByMphone")]
		public async Task<object> GetMerchantKycInfoByMphone(string mphone)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.GetAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/Kyc/GetMerchantKycInfoByMphone?mphone="+ mphone))
					{
						apiResponse = await response.Content.ReadAsAsync<dynamic>();

					}
					return apiResponse;
				}
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status400BadRequest,ex.ToString());
			}
		}
		[HttpGet]
		[Route("GetCurrentBalance")]
		public async Task<object> GetCurrentBalance(string mphone)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.GetAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/Kyc/GetCurrentBalance?mphone=" + mphone))
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
		[HttpGet]
		[Route("GetComissionBalance")]
		public async Task<object> GetComissionBalance(string mphone)
		{
			try
			{
				using (var httpClient = new HttpClient())
				{
					ApiInfo apiInfo = new ApiInfo();
					dynamic apiResponse = null;
					using (var response = await httpClient.GetAsync(apiInfo.Ip + apiInfo.ReportApiServer + "/Kyc/GetComissionBalance?mphone=" + mphone))
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