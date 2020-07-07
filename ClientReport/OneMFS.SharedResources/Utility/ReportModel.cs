using System;
using System.Collections.Generic;
using System.Text;

namespace OneMFS.SharedResources.Utility
{
	public class ReportModel
	{
		public string FileType { get; set; }
		public dynamic ReportOption { get; set; }	
		public ReportInfo ReportDetails { get; set; }
	}
}
