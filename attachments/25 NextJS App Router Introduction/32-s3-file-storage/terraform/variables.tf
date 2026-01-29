/**
 * ============================================================================
 * TERRAFORM VARIABLES - NextJS Foodies S3 Bucket
 * ============================================================================
 */

variable "project_name" {
  description = "Name prefix for all resources"
  type        = string
  default     = "nextjs-foodies"

  validation {
    condition     = can(regex("^[a-z0-9-]+$", var.project_name))
    error_message = "Project name must contain only lowercase letters, numbers, and hyphens."
  }
}

variable "environment" {
  description = "Environment name (dev, test, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "test", "prod"], var.environment)
    error_message = "Environment must be one of: dev, test, prod."
  }
}
