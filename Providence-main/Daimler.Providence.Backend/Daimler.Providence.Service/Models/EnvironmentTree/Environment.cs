﻿using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Runtime.Serialization;
using Daimler.Providence.Service.Models.StateTransition;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Daimler.Providence.Service.Models.EnvironmentTree
{
    /// <summary>
    /// Environment model
    /// </summary>
    [DataContract]
    [ExcludeFromCodeCoverage]
    public class Environment : Base
    {
        /// <summary>
        /// The id of the environment. Must be unique in the database. (if not set manually the subscriptionId will be generated by the system.)
        /// </summary>       
        [DataMember(Name = "subscriptionId")]
        public string SubscriptionId => ElementId;

        /// <summary>
        /// Date of the last known heartbeat of the environment.
        /// </summary>       
        [DataMember(Name = "lastHeartBeat")]
        public DateTime LastHeartBeat { get; set; }

        /// <summary>
        /// Indicates whether the environment is an a demo-environment
        /// </summary>       
        [DataMember(Name = "isDemo")]
        public bool IsDemo { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        [DataMember(Name = "logSystemState")]
        public State LogSystemState { get; set; } = StateTransition.State.Error;

        /// <summary>
        /// Services that belong to the environment.
        /// </summary>
        [DataMember(Name = "services")]
        public List<Service> Services { get; set; } = new List<Service>();

        /// <summary>
        /// List of child nodes which belongs to the environment.
        /// </summary>
        [JsonIgnore]
        public override List<Base> ChildNodes
        {
            get
            {
                var list = new List<Base>();

                if (Services != null)
                {
                    list.AddRange(Services.Cast<Base>().ToList());
                }
                if (Checks != null)
                {
                    list.AddRange(Checks.Cast<Base>().ToList());
                }
                return list;
            }
        }
    }
}