using System;
using System.Collections.Generic;
using System.Text;

namespace ClientReport.SecurityService.Model
{
	public class AuthClientUser
	{
		public bool IsAuthenticated { get; set; }
		public dynamic FeatureList { get; set; }
		public ApplicationUser User { get; set; }
		public string BearerToken { get; set; }
	}
}
