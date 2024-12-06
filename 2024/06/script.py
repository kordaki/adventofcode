# First, let's replicate the logic to debug the given JavaScript code in Python and use the provided input.
# Load the input file and process it in a Python adaptation of the user's algorithm.

input_file_path = "./06.2024.txt"

def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.read()

# Parse the map and find the guard's position
def get_map_and_guard(input_data):
    guard = {'i': 0, 'j': 0}
    map_data = []
    for idx, line in enumerate(input_data.split("\n")):
        splitted_line = list(line)
        if "^" in splitted_line:
            guard = {'i': idx, 'j': splitted_line.index("^")}
        map_data.append(splitted_line)
    return map_data, guard

# Determine the next step
def get_next_step(position, direction):
    if direction == "^":
        return {'nextI': position['i'] - 1, 'nextJ': position['j'], 'nextTurn': ">"}
    elif direction == ">":
        return {'nextI': position['i'], 'nextJ': position['j'] + 1, 'nextTurn': "v"}
    elif direction == "v":
        return {'nextI': position['i'] + 1, 'nextJ': position['j'], 'nextTurn': "<"}
    elif direction == "<":
        return {'nextI': position['i'], 'nextJ': position['j'] - 1, 'nextTurn': "^"}

# The main logic to move
def move(guard_position, direction, result, map_data, visited):
    key = (guard_position['i'], guard_position['j'], direction)
    if key in visited:
        return
    visited.add(key)
    
    next_step = get_next_step(guard_position, direction)
    next_i, next_j, next_turn = next_step['nextI'], next_step['nextJ'], next_step['nextTurn']
    
    if next_i < 0 or next_j < 0 or next_i >= len(map_data) or next_j >= len(map_data[0]):
        return

    if map_data[next_i][next_j] == "#":
        return move(guard_position, next_turn, result, map_data, visited)
    
    result.add((next_i, next_j))
    return move({'i': next_i, 'j': next_j}, direction, result, map_data, visited)

# Main function to simulate the behavior
def main(file_path):
    input_data = read_file(file_path)
    map_data, guard = get_map_and_guard(input_data)
    result = set()
    visited = set()
    result.add((guard['i'], guard['j']))
    map_data[guard['i']][guard['j']] = "."
    move(guard, "^", result, map_data, visited)
    return len(result)

# Execute and return the result
result_length = main(input_file_path)
print(result_length)
