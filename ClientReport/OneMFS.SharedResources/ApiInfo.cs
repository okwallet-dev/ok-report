using System;
using System.Collections.Generic;
using System.Text;

namespace OneMFS.SharedResources
{
	public class ApiInfo
	{
		public string Ip { get; set; } = "http://10.20.32.158/";
		public string SecurityApiServer { get; set; } = "OneMFS.SecurityApiServer/api";
		public string ReportApiServer { get; set; } = "OneMFS.ReportingApiServer/api";
	}
}
