import argparse
import subprocess

def create_secret(database_url, database_name):
  call_args = [
      "kubectl",
      "create",
      "secret",
      "generic",
      "database-access",
      f"--from-literal=DB_URL={database_url}",
      f"--from-literal=DB_NAME={database_name}"
  ]
  
  subprocess.check_call(
      call_args
  )

def create_pods():
  call_args = [
    "kubectl",
    "apply",
    "-f",
    "k8s.yml"
  ]

  subprocess.check_call(
      call_args
  )

def parse_args():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--database-url",
        help="Database URL",
        required=True
    )

    parser.add_argument(
        "--database-name",
        help="Database name",
        required=True
    )

    arguments = parser.parse_args()

    return arguments


if __name__ == "__main__":
    args = parse_args()
    print("Creating DB credentials secret")
    create_secret(args.database_url, args.database_name)
    print("Creating pods")
    create_pods()
    print("System successfully created")